export const Consultation = () => {
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

export const Ebooks = () => {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden h-full flex flex-col">
      <div className="flex flex-col gap-4 flex-1">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Ebooks</h2>
          <p className="text-white/80 text-sm mb-2">
            Guides pratiques pour réussir votre projet de laverie
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg px-3 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <span className="text-green-400 font-semibold text-sm">
              Code promo : <span className="text-white font-bold">CLUBLAV26</span>
            </span>
          </div>
        </div>
        <div className="relative w-full h-52 rounded-xl overflow-hidden mb-4">
          <img
            src="/etude-de-case.jpeg"
            alt="Étude de cas chiffrée - 5 ans de laverie"
            className="w-full h-full object-contain object-center"
          />
        </div>
      </div>
      <a
        href="https://lavcom.fr/nos-ebooks-2/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50 w-fit mt-auto"
        tabIndex={0}
        aria-label="Découvrir les ebooks Lavcom"
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        Découvrir les ebooks
      </a>
    </div>
  )
}