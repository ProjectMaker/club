-- Demandes « Offres et services » et leur suivi dans l'admin.
-- À exécuter dans l'éditeur SQL de Supabase. Le script peut être relancé sans risque :
-- il crée ce qui manque et complète une table offer_requests déjà créée.

create table if not exists public.offer_requests (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id uuid,
  offer text not null,
  -- Réponses au formulaire : { answers: [{ name, label, value }], user_match }
  data jsonb not null default '{}'::jsonb
);

alter table public.offer_requests
  -- Référence lisible CL-AAAA-00001, numérotée par année (voir le trigger plus bas)
  add column if not exists reference text unique,
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists status text not null default 'new',
  -- Coordonnées du demandeur, recopiées des réponses pour la recherche
  add column if not exists firstname text,
  add column if not exists lastname text,
  add column if not exists email text,
  add column if not exists phone_number text;

-- Membre rattaché : connecté, ou retrouvé par email (data.user_match). Vide pour un visiteur inconnu.
alter table public.offer_requests alter column user_id drop not null;
alter table public.offer_requests drop constraint if exists offer_requests_user_id_fkey;
alter table public.offer_requests
  add constraint offer_requests_user_id_fkey foreign key (user_id) references public.users(id) on delete set null;

alter table public.offer_requests drop constraint if exists offer_requests_status_check;
alter table public.offer_requests
  add constraint offer_requests_status_check check (status in ('new', 'follow_up', 'done', 'archived'));

-- Règle d'une première version du script, devenue inutile : seul le serveur écrit dans la table
drop policy if exists "Members can create their own requests" on public.offer_requests;

create index if not exists offer_requests_status_created_at on public.offer_requests (status, created_at desc);

create or replace function public.set_offer_request_reference() returns trigger
language plpgsql as $$
declare
  year text := to_char(new.created_at at time zone 'Europe/Paris', 'YYYY');
  next_number int;
begin
  -- Verrou par année : deux demandes simultanées n'obtiennent pas le même numéro
  perform pg_advisory_xact_lock(hashtext('offer_requests_reference_' || year));
  select coalesce(max(split_part(reference, '-', 3)::int), 0) + 1 into next_number
    from public.offer_requests
    where reference like 'CL-' || year || '-%';
  new.reference := 'CL-' || year || '-' || lpad(next_number::text, 5, '0');
  return new;
end;
$$;

drop trigger if exists offer_requests_set_reference on public.offer_requests;
create trigger offer_requests_set_reference
  before insert on public.offer_requests
  for each row execute function public.set_offer_request_reference();

-- Demandes déjà enregistrées : référence et coordonnées complétées a posteriori
update public.offer_requests request
  set reference = 'CL-' || numbered.year || '-' || lpad(numbered.position::text, 5, '0')
  from (
    select id,
      to_char(created_at at time zone 'Europe/Paris', 'YYYY') as year,
      row_number() over (partition by to_char(created_at at time zone 'Europe/Paris', 'YYYY') order by created_at, id) as position
    from public.offer_requests
  ) numbered
  where request.id = numbered.id and request.reference is null;

update public.offer_requests
  set firstname = (select answer->>'value' from jsonb_array_elements(data->'answers') answer where answer->>'name' = 'firstname'),
      lastname = (select answer->>'value' from jsonb_array_elements(data->'answers') answer where answer->>'name' = 'lastname'),
      email = (select answer->>'value' from jsonb_array_elements(data->'answers') answer where answer->>'name' = 'email'),
      phone_number = (select answer->>'value' from jsonb_array_elements(data->'answers') answer where answer->>'name' = 'phone_number')
  where email is null and jsonb_typeof(data->'answers') = 'array';

create table if not exists public.offer_request_notes (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  request_id bigint not null references public.offer_requests(id) on delete cascade,
  author_id uuid references public.users(id) on delete set null,
  content text not null
);

create index if not exists offer_request_notes_request_id on public.offer_request_notes (request_id, created_at desc);

-- Lecture et écriture uniquement côté serveur (clé service) : aucune règle d'accès publique
alter table public.offer_requests enable row level security;
alter table public.offer_request_notes enable row level security;
