import Link from "next/link";
import { notFound } from "next/navigation";

import { getOfferRequest } from "@/data-access-layers/offer-requests";
import { getOfferTitle } from "@/app/offers/_data";
import { OfferRequestAnswer, OfferRequestFile } from "@/models";
import { formatDate } from "@/utils/functions";
import StatusBadge from "../_StatusBadge";
import Status from "./_Status";
import Notes from "./_Notes";

// Coordonnées affichées à part, en tête de fiche
const CONTACT_ANSWERS = ['firstname', 'lastname', 'email', 'phone_number']

const isFiles = (value: OfferRequestAnswer['value']): value is OfferRequestFile[] => (
  Array.isArray(value) && value.some(item => typeof item !== 'string')
)

const AnswerValue = ({ value }: { value: OfferRequestAnswer['value'] }) => {
  if (isFiles(value)) {
    return (
      <ul className="flex flex-col gap-1">
        {value.map(file => (
          <li key={file.path}>
            {file.url ? (
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white underline">
                {file.name}
              </a>
            ) : (
              <span>{file.name} <span className="text-white/50">(lien indisponible)</span></span>
            )}
          </li>
        ))}
      </ul>
    )
  }
  const text = Array.isArray(value) ? value.join(', ') : value
  return <>{text || '—'}</>
}

const Card = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
    <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
    {children}
  </section>
)

export default async function AdminOfferRequest({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const request = await getOfferRequest(parseInt(id)).catch(() => null)
  if (!request) {
    notFound()
  }
  const answers = request.data.answers.filter(answer => !CONTACT_ANSWERS.includes(answer.name))
  const userMatch = request.data.user_match

  return (
    <div className="py-3 flex flex-col gap-6">
      <Link
        href="/private/admin/offers"
        className="flex items-center text-white/80 hover:text-white transition-colors duration-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour à la liste
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-white/70 text-sm">{request.reference}</p>
          <h1 className="text-2xl font-bold text-white">{getOfferTitle(request.offer)}</h1>
          <p className="text-white/60 text-sm">
            Reçue le {formatDate(request.created_at, true)} · mise à jour le {formatDate(request.updated_at, true)}
          </p>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 flex flex-col gap-6">
          <Card title="Demandeur">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-white/60">Nom</dt>
                <dd className="text-white font-medium">{request.firstname} {request.lastname}</dd>
              </div>
              <div>
                <dt className="text-white/60">Compte</dt>
                <dd className="text-white font-medium">
                  {request.user_id ? (
                    <>
                      <Link href={`/private/admin/users/${request.user_id}?approved=true`} className="text-blue-300 hover:text-white underline">
                        Voir le membre
                      </Link>
                      {userMatch === 'email' && (
                        <span className="ml-2 rounded-full border border-amber-300/50 bg-amber-500/20 px-2 py-0.5 text-xs text-amber-100">
                          Rattaché par email, non vérifié
                        </span>
                      )}
                    </>
                  ) : 'Visiteur sans compte'}
                </dd>
              </div>
              <div>
                <dt className="text-white/60">Email</dt>
                <dd className="text-white font-medium break-words">
                  <a href={`mailto:${request.email}`} className="hover:underline">{request.email}</a>
                </dd>
              </div>
              <div>
                <dt className="text-white/60">Téléphone</dt>
                <dd className="text-white font-medium">
                  <a href={`tel:${request.phone_number}`} className="hover:underline">{request.phone_number}</a>
                </dd>
              </div>
            </dl>
          </Card>

          <Card title="Réponses">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              {answers.map(answer => (
                <div key={answer.name} className={typeof answer.value === 'string' && answer.value.length > 80 ? 'sm:col-span-2' : ''}>
                  <dt className="text-white/60">{answer.label}</dt>
                  <dd className="text-white font-medium whitespace-pre-line break-words">
                    <AnswerValue value={answer.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card title="Statut">
            <Status id={request.id} status={request.status} />
          </Card>
          <Card title="Notes internes">
            <Notes requestId={request.id} notes={request.notes || []} />
          </Card>
        </div>
      </div>
    </div>
  )
}
