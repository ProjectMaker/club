const Consultation = () => {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Un doute sur votre projet de laverie
          </h2>
          <p className="text-white/80 mb-4">
            Prenez 45 minutes pour mettre à plat votre réflexion et lever les points de blocage avec un expert terrain
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2 text-white/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>clarifier vos zones d&apos;incertitudes</span>
            </li>
            <li className="flex items-start gap-2 text-white/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>lever les objections qui vous freinent</span>
            </li>
            <li className="flex items-start gap-2 text-white/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>vous aider à décider en toute lucidité</span>
            </li>
          </ul>
        </div>
        <a
          href="https://calendly.com/raphael-pariscommerce/45min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50 w-fit"
          tabIndex={0}
          aria-label="Réserver un entretien sur Calendly"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Réserver un entretien
        </a>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      <Consultation />
    </div>
  )
}