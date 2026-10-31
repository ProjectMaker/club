// Catalogue des offres et services. Pour ajouter une offre, ajouter une entrée à OFFERS.
// Les images sont à déposer dans /public/images/offers/<slug>/ ; sans image, un visuel par défaut est affiché.

export interface OfferStep {
  label: string
  icon: React.ReactNode
}

export interface OfferPrestation {
  title: string
  description: string
  image?: string
  icon: React.ReactNode
}

// Champ du formulaire de demande d'une offre
export interface FormField {
  name: string
  // files : photos ou documents joints (formats et limites dans OFFER_UPLOAD)
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'department' | 'choices' | 'multiple' | 'files'
  label: string
  required?: boolean
  placeholder?: string
  // Pour select, choices (choix unique en boutons) et multiple (choix multiples en boutons)
  options?: (string | { value: string, icon: React.ReactNode })[]
  // Unité affichée dans le récapitulatif (ex : m²)
  unit?: string
  // Occupe une demi-largeur sur écran large
  half?: boolean
  autoComplete?: string
  defaultValue?: string
  // Affiché seulement si le champ « name » vaut (ou contient, pour un choix multiple) « value ».
  // Un champ conditionnel est toujours facultatif.
  showIf?: { name: string, value: string }
}

export interface FormStep {
  label: string
  fields: FormField[]
}

// Les coordonnées sont ajoutées automatiquement à la dernière étape, suivie d'une étape « Validation »
export interface OfferForm {
  title: string
  intro: string
  steps: FormStep[]
  success: string
}

export interface Offer {
  slug: string
  title: string
  summary: string
  description: string
  image?: string
  steps?: OfferStep[]
  // Titre et sous-titre de la section des prestations (textes par défaut si absents)
  prestationsTitle?: string
  prestationsIntro?: string
  prestations: OfferPrestation[]
  benefits?: string[]
  model?: string[]
  // Encart « projet spécifique » qui renvoie vers le formulaire
  contact?: { title: string, text: string, label: string }
  form: OfferForm
}

type IconProps = { className?: string }

const iconProps = {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  strokeWidth: 1.8,
  'aria-hidden': true,
} as const

export const DocumentIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

export const PencilIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.232-6.232a2.5 2.5 0 113.536 3.536L12.536 16.536 8 18l1.464-4.536z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16" />
  </svg>
)

export const GearIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

export const StoreIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l1.5-5h15L21 9M3 9h18M3 9a3 3 0 006 0m0 0a3 3 0 006 0m0 0a3 3 0 006 0M5 12v8h14v-8M10 20v-5h4v5" />
  </svg>
)

export const HomeIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

export const WrenchIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
  </svg>
)

export const LeafIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15zm0 0c2-4 5-7 9-9" />
  </svg>
)

export const ChartIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16M7 16v-4m5 4V8m5 8V5" />
  </svg>
)

export const CoinsIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 6v4c0 1.66 3.13 3 7 3s7-1.34 7-3V6M5 10v4c0 1.66 3.13 3 7 3s7-1.34 7-3v-4M5 14v4c0 1.66 3.13 3 7 3s7-1.34 7-3v-4" />
  </svg>
)

export const UsersIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1M10 11a4 4 0 100-8 4 4 0 000 8zM21 20v-1a4 4 0 00-3-3.87M15 3.13a4 4 0 010 7.75" />
  </svg>
)

export const HeadsetIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 14v-2a8 8 0 0116 0v2M4 14a2 2 0 002 2h1v-5H6a2 2 0 00-2 2v1zm16 0a2 2 0 01-2 2h-1v-5h1a2 2 0 012 2v1zm-3 2v1a3 3 0 01-3 3h-2" />
  </svg>
)

export const CameraIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l13 4-1.5 4.5L2 11.5 3 7zm13 4l4-1v6l-5.5-.5M6 13l-1 6H3" />
  </svg>
)

export const WifiIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 9a15 15 0 0120 0M5 12.5a10 10 0 0114 0M8.5 16a5 5 0 017 0M12 19.5h.01" />
  </svg>
)

export const CardIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h4" />
  </svg>
)

export const BankIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-6 9 6M5 10v8m4-8v8m6-8v8m4-8v8M3 20h18" />
  </svg>
)

export const ShieldIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3zm-3 9l2 2 4-4" />
  </svg>
)

export const ScaleIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg {...iconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M8 20h8M5 7h14M5 7l-3 6a3 3 0 006 0L5 7zm14 0l-3 6a3 3 0 006 0l-3-6z" />
  </svg>
)

// Formulaire de demande de service, commun à plusieurs offres
const SERVICE_REQUEST_FORM: OfferForm = {
  title: 'Décrivez votre besoin',
  intro: 'Remplissez ce formulaire pour que nous puissions étudier votre demande et vous orienter vers les solutions les plus adaptées.',
  success: 'Merci ! Votre demande a bien été reçue. Club Laverie revient vers vous rapidement, sur le créneau que vous avez indiqué.',
  steps: [
    {
      label: 'Votre demande',
      fields: [
        {
          name: 'request_type', type: 'choices', label: 'Type de demande', required: true,
          options: ['Dépannage', 'Entretien', 'Pièces', 'Optimisation'],
        },
        {
          name: 'urgency', type: 'choices', label: 'Urgence', required: true,
          options: ['Immédiate', 'Sous 7 jours', 'Non urgente'],
        },
        { name: 'department', type: 'department', label: 'Département de la laverie', required: true, half: true, placeholder: 'Nom ou numéro, ex : Rhône ou 69' },
        { name: 'city', type: 'text', label: 'Ville de la laverie', half: true, placeholder: 'Votre ville' },
        { name: 'equipment', type: 'text', label: 'Marque et référence du matériel', placeholder: 'Si connues, ex : Electrolux W5130H' },
      ],
    },
    {
      label: 'Détails',
      fields: [
        { name: 'description', type: 'textarea', label: 'Description du problème ou objectif', required: true, placeholder: 'Décrivez la panne, le besoin ou ce que vous souhaitez améliorer...' },
        { name: 'attachments', type: 'files', label: 'Photos ou documents' },
        {
          name: 'contact_slot', type: 'choices', label: 'Créneau de contact souhaité', required: true,
          options: ['Matin (9h - 12h)', 'Midi (12h - 14h)', 'Après-midi (14h - 18h)', 'Indifférent'],
        },
      ],
    },
  ],
}

export const OFFERS: Offer[] = [
  {
    slug: 'creer-ou-renover-ma-laverie',
    title: 'Créer ou rénover ma laverie',
    summary: 'De l’étude de faisabilité à l’ouverture, un accompagnement complet pour créer, aménager ou rénover votre laverie.',
    image: '/images/offers/creer-ou-renover-ma-laverie/hero.jpg',
    description: 'De l’étude de faisabilité à l’ouverture, nous vous accompagnons dans toutes les étapes de votre projet de création, d’aménagement ou de rénovation de laverie.',
    steps: [
      { label: 'Étude de faisabilité et implantation', icon: <DocumentIcon /> },
      { label: 'Conception et plans', icon: <PencilIcon /> },
      { label: 'Travaux et installation du matériel', icon: <GearIcon /> },
      { label: 'Aménagement et mise en service', icon: <StoreIcon /> },
    ],
    prestations: [
      {
        title: 'Étude de faisabilité',
        image: '/images/offers/creer-ou-renover-ma-laverie/etude-faisabilite.jpg',
        description: 'Analyse du marché, zone de chalandise, aide au choix de l’emplacement.',
        icon: <DocumentIcon />,
      },
      {
        title: 'Conception et plans',
        image: '/images/offers/creer-ou-renover-ma-laverie/conception-plans.jpg',
        description: 'Plans d’implantation, conseils d’aménagement, choix des machines.',
        icon: <PencilIcon />,
      },
      {
        title: 'Travaux et installation',
        image: '/images/offers/creer-ou-renover-ma-laverie/travaux-installation.jpg',
        description: 'Rénovation, mise aux normes, installation du matériel et des équipements.',
        icon: <GearIcon />,
      },
      {
        title: 'Aménagement et décoration',
        image: '/images/offers/creer-ou-renover-ma-laverie/amenagement-decoration.jpg',
        description: 'Agencement, mobilier, signalétique, ambiance et parcours client.',
        icon: <StoreIcon />,
      },
    ],
    benefits: [
      'Des partenaires spécialisés et expérimentés',
      'Un gain de temps dans la recherche de prestataires',
      'Un accompagnement de A à Z',
      'Des retours d’expérience de professionnels',
      'Des solutions adaptées à votre budget',
      'Un interlocuteur unique : Club Laverie',
    ],
    model: [
      'La mise en relation est gratuite pour les membres.',
      'Club Laverie perçoit une commission sur les prestations facturées par ses partenaires.',
    ],
    form: {
      title: 'Décrivez votre projet',
      intro: 'Remplissez ce formulaire pour que nous puissions étudier votre demande et vous orienter vers les partenaires les plus adaptés.',
      success: 'Merci ! Club Laverie étudie votre projet et revient vers vous rapidement pour vous orienter vers les partenaires les plus adaptés.',
      steps: [
        {
          label: 'Votre projet',
          fields: [
            {
              name: 'project_type', type: 'choices', label: 'Nature du projet', required: true,
              options: [
                { value: 'Création', icon: <HomeIcon className="w-5 h-5" /> },
                { value: 'Rénovation', icon: <WrenchIcon className="w-5 h-5" /> },
              ],
            },
            {
              name: 'stage', type: 'choices', label: 'Stade du projet', required: true,
              options: ['Recherche', 'Local identifié', 'Travaux prévus'],
            },
            { name: 'department', type: 'department', label: 'Département', required: true, half: true, placeholder: 'Nom ou numéro, ex : Rhône ou 69' },
            { name: 'city', type: 'text', label: 'Ville', half: true, placeholder: 'Votre ville' },
            {
              name: 'location', type: 'choices', label: 'Situation du local', required: true,
              options: ['Centre-ville', 'Quartier résidentiel', 'Zone commerciale', 'Galerie / centre commercial', 'Pas encore de local'],
            },
            { name: 'surface', type: 'number', label: 'Surface approximative (m²)', required: true, half: true, placeholder: 'Ex : 50', unit: 'm²' },
            { name: 'constraints', type: 'textarea', label: 'Contraintes connues', placeholder: 'Copropriété, extraction, évacuation des eaux, puissance électrique, accessibilité...' },
          ],
        },
        {
          label: 'Détails',
          fields: [
            {
              name: 'budget', type: 'select', label: 'Budget indicatif', placeholder: 'Sélectionnez une fourchette (facultatif)',
              options: ['Moins de 50 000 €', '50 000 € à 100 000 €', '100 000 € à 200 000 €', 'Plus de 200 000 €'],
            },
            {
              name: 'start_date', type: 'choices', label: 'Date souhaitée de démarrage', required: true,
              options: ['Dès que possible', 'Dans moins de 3 mois', 'Dans 3 à 6 mois', 'Dans plus de 6 mois'],
            },
            { name: 'description', type: 'textarea', label: 'Votre projet en quelques mots', placeholder: 'Décrivez votre projet, vos objectifs et vos attentes...' },
          ],
        },
      ],
    },
  },
  {
    slug: 'acheter-ou-financer-du-materiel',
    title: 'Acheter ou financer du matériel',
    summary: 'Matériel neuf ou d’occasion, location longue durée, centrales de paiement et pièces détachées : trouvez la bonne solution pour votre laverie.',
    image: '/images/offers/acheter-ou-financer-du-materiel/hero.jpg',
    description: 'Équipez votre laverie avec du matériel professionnel adapté à votre projet. Décrivez vos besoins pour être orienté vers les solutions disponibles auprès du réseau Club Laverie.',
    prestations: [
      {
        title: 'Matériel neuf',
        image: '/images/offers/acheter-ou-financer-du-materiel/materiel-neuf.jpg',
        description: 'Machines à laver, sèche-linge et équipements professionnels toutes marques.',
        icon: <StoreIcon />,
      },
      {
        title: 'Matériel d’occasion',
        image: '/images/offers/acheter-ou-financer-du-materiel/materiel-occasion.jpg',
        description: 'Acheter ou vendre des équipements professionnels d’occasion.',
        icon: <GearIcon />,
      },
      {
        title: 'Location longue durée',
        image: '/images/offers/acheter-ou-financer-du-materiel/location-longue-duree.jpg',
        description: 'Étudier les solutions de financement de vos équipements.',
        icon: <DocumentIcon />,
      },
      {
        title: 'Centrales de paiement',
        image: '/images/offers/acheter-ou-financer-du-materiel/centrales-paiement.jpg',
        description: 'Monétique, sans-contact, applications et systèmes de gestion.',
        icon: <DocumentIcon />,
      },
      {
        title: 'Pièces détachées et accessoires',
        image: '/images/offers/acheter-ou-financer-du-materiel/pieces-detachees.jpg',
        description: 'Pièces de rechange, équipements complémentaires et consommables.',
        icon: <WrenchIcon />,
      },
    ],
    benefits: [
      'Des fournisseurs et techniciens spécialisés',
      'Un gain de temps dans la recherche de matériel',
      'Toutes marques, neuf ou d’occasion',
      'Des solutions de financement adaptées',
      'Des retours d’expérience de professionnels',
      'Un interlocuteur unique : Club Laverie',
    ],
    model: [
      'La demande est gratuite et sans engagement.',
      'Club Laverie perçoit une commission sur les prestations facturées par ses partenaires.',
    ],
    form: SERVICE_REQUEST_FORM,
  },
  {
    slug: 'entretenir-et-optimiser-ma-laverie',
    title: 'Entretenir et optimiser ma laverie',
    summary: 'Maintenance, dépannage, télémaintenance, consommables et réduction des coûts énergétiques pour une laverie performante et rentable.',
    image: '/images/offers/entretenir-et-optimiser-ma-laverie/hero.jpg',
    description: 'Maintenance, dépannage, télémaintenance, consommables et solutions pour réduire vos coûts énergétiques. Nous vous accompagnons pour assurer la performance et la rentabilité de votre laverie dans la durée.',
    steps: [
      { label: 'Interventions rapides et réseau de techniciens', icon: <WrenchIcon /> },
      { label: 'Réduction des coûts d’exploitation', icon: <GearIcon /> },
      { label: 'Solutions pour plus de performance', icon: <LeafIcon /> },
      { label: 'Conseils personnalisés', icon: <ChartIcon /> },
    ],
    prestationsIntro: 'Des solutions concrètes pour entretenir, optimiser et sécuriser votre laverie.',
    prestations: [
      {
        title: 'Maintenance et dépannage',
        image: '/images/offers/entretenir-et-optimiser-ma-laverie/maintenance-depannage.jpg',
        description: 'Interventions sur toutes marques, réseau de techniciens spécialisés.',
        icon: <WrenchIcon />,
      },
      {
        title: 'Télémaintenance et suivi à distance',
        image: '/images/offers/entretenir-et-optimiser-ma-laverie/telemaintenance.jpg',
        description: 'Optimisation, diagnostic à distance et suivi des performances.',
        icon: <ChartIcon />,
      },
      {
        title: 'Consommables',
        image: '/images/offers/entretenir-et-optimiser-ma-laverie/consommables.jpg',
        description: 'Lessives, adoucissants et consommables professionnels.',
        icon: <StoreIcon />,
      },
      {
        title: 'Réduction des coûts énergétiques',
        image: '/images/offers/entretenir-et-optimiser-ma-laverie/couts-energetiques.jpg',
        description: 'Solutions pour optimiser vos consommations d’eau et d’énergie.',
        icon: <LeafIcon />,
      },
      {
        title: 'Optimisation de l’exploitation',
        image: '/images/offers/entretenir-et-optimiser-ma-laverie/optimisation-exploitation.jpg',
        description: 'Conseils, paramétrages et bonnes pratiques pour améliorer la rentabilité de votre laverie.',
        icon: <GearIcon />,
      },
    ],
    benefits: [
      'Des techniciens qualifiés, toutes marques',
      'Des interventions rapides près de chez vous',
      'Moins de pannes et d’immobilisation des machines',
      'Des consommations d’eau et d’énergie maîtrisées',
      'Des conseils issus du terrain',
      'Un interlocuteur unique : Club Laverie',
    ],
    model: [
      'La demande est gratuite et sans engagement.',
      'Club Laverie perçoit une commission sur les prestations facturées par ses partenaires.',
    ],
    form: SERVICE_REQUEST_FORM,
  },
  {
    slug: 'developper-de-nouveaux-revenus',
    title: 'Développer de nouveaux revenus',
    summary: 'Lockers, distributeurs, Wash Dog, lavage à l’ozone et services complémentaires pour diversifier l’activité de votre laverie.',
    image: '/images/offers/developper-de-nouveaux-revenus/hero.jpg',
    description: 'Diversifiez votre activité et attirez une nouvelle clientèle grâce à des solutions complémentaires déjà éprouvées dans les laveries automatiques et pressings.',
    steps: [
      { label: 'Nouvelles sources de chiffre d’affaires', icon: <CoinsIcon /> },
      { label: 'Une clientèle plus large', icon: <UsersIcon /> },
      { label: 'Des solutions clés en main', icon: <ChartIcon /> },
      { label: 'Des partenaires spécialisés', icon: <WrenchIcon /> },
      { label: 'Une activité plus rentable', icon: <LeafIcon /> },
    ],
    prestationsTitle: 'Nos solutions pour développer votre activité',
    prestationsIntro: 'Des équipements et services complémentaires pour maximiser le potentiel de votre laverie.',
    prestations: [
      {
        title: 'Lockers et casiers connectés',
        image: '/images/offers/developper-de-nouveaux-revenus/lockers.jpg',
        description: 'Casiers pour la réception et la livraison de colis, consignes et services de proximité.',
        icon: <StoreIcon />,
      },
      {
        title: 'Distributeurs multiservices',
        image: '/images/offers/developper-de-nouveaux-revenus/distributeurs.jpg',
        description: 'Distributeurs de lessive, produits d’entretien, boissons, snacks, etc.',
        icon: <StoreIcon />,
      },
      {
        title: 'Wash Dog',
        image: '/images/offers/developper-de-nouveaux-revenus/wash-dog.jpg',
        description: 'Solution de lavage pour animaux de compagnie en libre-service.',
        icon: <HomeIcon />,
      },
      {
        title: 'Lavage à l’ozone',
        image: '/images/offers/developper-de-nouveaux-revenus/lavage-ozone.jpg',
        description: 'Désinfection naturelle, sans produits chimiques, idéale pour le linge et les textiles délicats.',
        icon: <LeafIcon />,
      },
      {
        title: 'Services complémentaires',
        image: '/images/offers/developper-de-nouveaux-revenus/services-complementaires.jpg',
        description: 'Pressing, repassage, retouches, photocopie, solutions de confort et autres services adaptés à votre clientèle.',
        icon: <GearIcon />,
      },
    ],
    contact: {
      title: 'Un projet spécifique ? Parlez-nous de votre idée.',
      text: 'Notre équipe vous conseille et vous oriente vers les partenaires les plus adaptés.',
      label: 'Nous contacter',
    },
    form: {
      title: 'Décrivez votre projet',
      intro: 'Remplissez ce formulaire pour que nous puissions étudier votre demande et vous orienter vers les solutions les plus adaptées.',
      success: 'Merci ! Club Laverie étudie votre projet et revient vers vous rapidement pour vous orienter vers les solutions les plus adaptées.',
      steps: [
        {
          label: 'Votre projet',
          fields: [
            {
              name: 'solutions', type: 'multiple', label: 'Solution(s) souhaitée(s)', required: true,
              options: ['Lockers et casiers connectés', 'Distributeurs multiservices', 'Wash Dog', 'Lavage à l’ozone', 'Services complémentaires'],
            },
            {
              name: 'establishment', type: 'choices', label: 'Votre établissement', required: true,
              options: [
                { value: 'Laverie existante', icon: <StoreIcon className="w-5 h-5" /> },
                { value: 'Projet de création', icon: <HomeIcon className="w-5 h-5" /> },
              ],
            },
            { name: 'department', type: 'department', label: 'Département', required: true, half: true, placeholder: 'Nom ou numéro, ex : Rhône ou 69' },
            { name: 'location', type: 'text', label: 'Emplacement', half: true, placeholder: 'Ville, quartier, adresse...' },
            { name: 'surface', type: 'number', label: 'Surface disponible estimée (m²)', required: true, half: true, placeholder: 'Ex : 20', unit: 'm²' },
          ],
        },
        {
          label: 'Détails',
          fields: [
            { name: 'constraints', type: 'textarea', label: 'Contraintes d’accès ou d’électricité connues', placeholder: 'Accès livraison, horaires, puissance électrique disponible, arrivée d’eau...' },
            {
              name: 'budget', type: 'select', label: 'Budget indicatif', placeholder: 'Sélectionnez une fourchette (facultatif)',
              options: ['Moins de 10 000 €', '10 000 € à 30 000 €', '30 000 € à 60 000 €', 'Plus de 60 000 €'],
            },
            {
              name: 'timeline', type: 'choices', label: 'Délai envisagé', required: true,
              options: ['Dès que possible', 'Sous 3 mois', 'Sous 6 mois', 'Plus de 6 mois'],
            },
          ],
        },
      ],
    },
  },
  {
    slug: 'digitaliser-et-securiser-mon-activite',
    title: 'Digitaliser et sécuriser mon activité',
    summary: 'Centre d’appel, vidéosurveillance, gestion à distance, paiement connecté et suivi de performance pour piloter votre laverie sereinement.',
    image: '/images/offers/digitaliser-et-securiser-mon-activite/hero.jpg',
    description: 'Simplifiez la gestion de votre laverie et sécurisez votre exploitation grâce à des solutions digitales et connectées, adaptées aux professionnels.',
    steps: [
      { label: 'Support à distance', icon: <HeadsetIcon /> },
      { label: 'Sécurité renforcée de vos locaux', icon: <CameraIcon /> },
      { label: 'Gestion connectée de votre parc machines', icon: <WifiIcon /> },
      { label: 'Solutions de paiement modernes', icon: <CardIcon /> },
      { label: 'Suivi de performance en temps réel', icon: <ChartIcon /> },
    ],
    prestationsTitle: 'Nos solutions pour digitaliser et sécuriser votre activité',
    prestationsIntro: 'Des outils simples et efficaces pour gagner en sérénité et améliorer la performance de votre laverie.',
    prestations: [
      {
        title: 'Centre d’appel (humain ou IA)',
        image: '/images/offers/digitaliser-et-securiser-mon-activite/centre-appel.jpg',
        description: 'Assistance client, gestion des incidents et réponses aux utilisateurs.',
        icon: <HeadsetIcon />,
      },
      {
        title: 'Vidéosurveillance',
        image: '/images/offers/digitaliser-et-securiser-mon-activite/videosurveillance.jpg',
        description: 'Installation, maintenance et accès à distance pour sécuriser vos locaux.',
        icon: <CameraIcon />,
      },
      {
        title: 'Gestion à distance',
        image: '/images/offers/digitaliser-et-securiser-mon-activite/gestion-distance.jpg',
        description: 'Suivi de vos machines, alertes, encaissements et reporting.',
        icon: <WifiIcon />,
      },
      {
        title: 'Systèmes de paiement connectés',
        image: '/images/offers/digitaliser-et-securiser-mon-activite/paiement-connecte.jpg',
        description: 'Centrales de paiement, sans-contact, applications mobiles et fidélisation.',
        icon: <CardIcon />,
      },
      {
        title: 'Suivi de performance',
        image: '/images/offers/digitaliser-et-securiser-mon-activite/suivi-performance.jpg',
        description: 'Analyse de la fréquentation, du chiffre d’affaires et de la consommation énergétique.',
        icon: <ChartIcon />,
      },
    ],
    contact: {
      title: 'Un projet spécifique ? Parlez-nous de votre besoin.',
      text: 'Notre équipe vous conseille et vous oriente vers les partenaires les plus adaptés.',
      label: 'Nous contacter',
    },
    form: {
      title: 'Décrivez votre besoin',
      intro: 'Remplissez ce formulaire pour que nous puissions étudier votre demande et vous orienter vers les solutions les plus adaptées.',
      success: 'Merci ! Votre demande a bien été reçue. Club Laverie revient vers vous rapidement pour vous orienter vers les solutions les plus adaptées.',
      steps: [
        {
          label: 'Votre besoin',
          fields: [
            {
              name: 'solutions', type: 'multiple', label: 'Solution(s) visée(s)', required: true,
              options: [
                { value: 'Centre d’appel (humain ou IA)', icon: <HeadsetIcon className="w-5 h-5" /> },
                { value: 'Vidéosurveillance', icon: <CameraIcon className="w-5 h-5" /> },
                { value: 'Gestion à distance', icon: <WifiIcon className="w-5 h-5" /> },
                { value: 'Systèmes de paiement connectés', icon: <CardIcon className="w-5 h-5" /> },
                { value: 'Suivi de performance', icon: <ChartIcon className="w-5 h-5" /> },
              ],
            },
            { name: 'laundries_count', type: 'number', label: 'Nombre de laveries concernées', required: true, half: true, placeholder: 'Ex : 2' },
            { name: 'current_setup', type: 'textarea', label: 'Équipement ou logiciel déjà en place', placeholder: 'Centrale de paiement, caméras, logiciel de gestion... ou « aucun »' },
          ],
        },
        {
          label: 'Détails',
          fields: [
            { name: 'goal', type: 'textarea', label: 'Difficulté actuelle ou objectif recherché', required: true, placeholder: 'Ce qui vous pose problème aujourd’hui ou ce que vous voulez améliorer...' },
            {
              name: 'call_center_hours', type: 'choices', label: 'Horaires de couverture souhaités pour le centre d’appel',
              options: ['Heures d’ouverture', 'Soirs et week-ends', '24h/24, 7j/7'],
              showIf: { name: 'solutions', value: 'Centre d’appel (humain ou IA)' },
            },
            {
              name: 'monthly_budget', type: 'select', label: 'Budget mensuel indicatif', placeholder: 'Sélectionnez une fourchette (facultatif)',
              options: ['Moins de 100 € / mois', '100 € à 300 € / mois', '300 € à 1 000 € / mois', 'Plus de 1 000 € / mois'],
            },
            {
              name: 'deployment', type: 'choices', label: 'Échéance de déploiement', required: true,
              options: ['Dès que possible', 'Sous 3 mois', 'Sous 6 mois', 'Plus de 6 mois'],
            },
          ],
        },
      ],
    },
  },
  {
    slug: 'financer-et-securiser-mon-projet',
    title: 'Financer et sécuriser mon projet',
    summary: 'Experts-comptables, avocats, assurances et financements pour sécuriser votre laverie, de la création à l’exploitation.',
    image: '/images/offers/financer-et-securiser-mon-projet/hero.jpg',
    description: 'Bénéficiez de l’accompagnement de professionnels spécialisés pour financer, assurer et sécuriser votre laverie, de la création à l’exploitation.',
    steps: [
      { label: 'Des experts spécialisés', icon: <BankIcon /> },
      { label: 'Une meilleure protection', icon: <ShieldIcon /> },
      { label: 'Des solutions de financement', icon: <CoinsIcon /> },
      { label: 'Un accompagnement sur mesure', icon: <DocumentIcon /> },
      { label: 'La sécurisation de votre investissement', icon: <ChartIcon /> },
    ],
    prestationsTitle: 'Nos solutions pour financer et sécuriser votre projet',
    prestationsIntro: 'Des partenaires spécialisés pour vous accompagner à chaque étape.',
    prestations: [
      {
        title: 'Experts-comptables',
        image: '/images/offers/financer-et-securiser-mon-projet/experts-comptables.jpg',
        description: 'Conseil comptable, business plan, optimisation fiscale et suivi de gestion.',
        icon: <DocumentIcon />,
      },
      {
        title: 'Avocats spécialisés',
        image: '/images/offers/financer-et-securiser-mon-projet/avocats.jpg',
        description: 'Droit des baux, création d’entreprise, contrats et sécurisation juridique.',
        icon: <ScaleIcon />,
      },
      {
        title: 'Assurances',
        image: '/images/offers/financer-et-securiser-mon-projet/assurances.jpg',
        description: 'Assurances multi-risques, perte d’exploitation et garanties spécifiques.',
        icon: <ShieldIcon />,
      },
      {
        title: 'Financement bancaire',
        image: '/images/offers/financer-et-securiser-mon-projet/financement-bancaire.jpg',
        description: 'Recherche de financements, prêts professionnels et montage de dossiers.',
        icon: <BankIcon />,
      },
      {
        title: 'Financement d’équipements',
        image: '/images/offers/financer-et-securiser-mon-projet/financement-equipements.jpg',
        description: 'Solutions de crédit, location longue durée et contrats de financement adaptés.',
        icon: <CoinsIcon />,
      },
    ],
    contact: {
      title: 'Un besoin spécifique ? Parlez-nous de votre projet.',
      text: 'Notre équipe vous conseille et vous oriente vers les partenaires les plus adaptés.',
      label: 'Nous contacter',
    },
    form: {
      title: 'Décrivez votre projet',
      intro: 'Remplissez ce formulaire pour que nous puissions étudier votre demande et vous orienter vers les partenaires les plus adaptés.',
      success: 'Merci ! Club Laverie étudie votre demande et revient vers vous rapidement pour vous orienter vers les partenaires les plus adaptés.',
      steps: [
        {
          label: 'Votre projet',
          fields: [
            {
              name: 'need', type: 'multiple', label: 'Nature du besoin', required: true,
              options: [
                { value: 'Comptabilité', icon: <DocumentIcon className="w-5 h-5" /> },
                { value: 'Juridique', icon: <ScaleIcon className="w-5 h-5" /> },
                { value: 'Assurance', icon: <ShieldIcon className="w-5 h-5" /> },
                { value: 'Financement', icon: <CoinsIcon className="w-5 h-5" /> },
              ],
            },
            {
              name: 'situation', type: 'choices', label: 'Situation', required: true,
              options: ['Acquisition', 'Création', 'Exploitation'],
            },
            { name: 'department', type: 'department', label: 'Département concerné', required: true, placeholder: 'Nom ou numéro, ex : Rhône ou 69' },
            {
              name: 'progress', type: 'choices', label: 'État d’avancement', required: true,
              options: ['Réflexion', 'Projet défini', 'Démarches en cours', 'À finaliser'],
            },
          ],
        },
        {
          label: 'Détails',
          fields: [
            {
              name: 'amount', type: 'select', label: 'Montant ou ordre de grandeur', placeholder: 'Si pertinent (facultatif)',
              options: ['Moins de 50 000 €', '50 000 € à 150 000 €', '150 000 € à 300 000 €', 'Plus de 300 000 €'],
            },
            { name: 'question', type: 'textarea', label: 'Question principale', required: true, placeholder: 'La question à laquelle vous souhaitez une réponse en priorité...' },
            {
              name: 'deadline', type: 'choices', label: 'Délai souhaité', required: true,
              options: ['Dès que possible', 'Sous 1 mois', 'Sous 3 mois', 'Plus de 3 mois'],
            },
          ],
        },
      ],
    },
  },
]

export const getOffer = (slug: string) => OFFERS.find(offer => offer.slug === slug)

export const getOfferTitle = (slug: string) => getOffer(slug)?.title || slug
