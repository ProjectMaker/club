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
  // Sous-titre de « Nos prestations » (texte par défaut si absent)
  prestationsIntro?: string
  prestations: OfferPrestation[]
  benefits: string[]
  model: string[]
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
]

export const getOffer = (slug: string) => OFFERS.find(offer => offer.slug === slug)

export const getOfferTitle = (slug: string) => getOffer(slug)?.title || slug
