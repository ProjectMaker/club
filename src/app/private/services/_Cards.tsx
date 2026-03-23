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

export const Webinar = () => {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden h-full flex flex-col">
      <div className="flex flex-col gap-1 flex-1">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            Webinaire Laverie en vue
          </h2>
        </div>
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-2">
          <img
            src="/webinar.jpeg"
            alt="Webinaire Laverie en vue"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      <a
        href="https://www.helloasso.com/associations/association-francaise-des-laveries/evenements/laverie-en-vue-1"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50 w-fit mt-auto"
        tabIndex={0}
        aria-label="S'inscrire au webinaire Laverie en vue"
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
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        S&apos;inscrire
      </a>
    </div>
  )
}

export const WebinarOzone = () => {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden h-full flex flex-col">
      <div className="flex flex-col gap-1 flex-1">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">
            Solution de lavage à l&apos;ozone
          </h2>
          <p className="text-white/70 text-sm mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-cyan-400"
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
            Mercredi 8 avril 2026 • 12h - 13h30
          </p>
        </div>
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/30">
          <svg
            viewBox="0 0 200 120"
            className="w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="bubble1" cx="30%" cy="30%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(103,232,249,0.3)" />
              </radialGradient>
              <radialGradient id="bubble2" cx="30%" cy="30%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="100%" stopColor="rgba(34,211,238,0.2)" />
              </radialGradient>
            </defs>
            <circle cx="30" cy="80" r="18" fill="url(#bubble1)" opacity="0.9" />
            <circle cx="70" cy="50" r="25" fill="url(#bubble1)" opacity="0.85" />
            <circle cx="120" cy="75" r="20" fill="url(#bubble2)" opacity="0.8" />
            <circle cx="160" cy="40" r="28" fill="url(#bubble1)" opacity="0.75" />
            <circle cx="45" cy="30" r="12" fill="url(#bubble2)" opacity="0.7" />
            <circle cx="95" cy="95" r="15" fill="url(#bubble1)" opacity="0.8" />
            <circle cx="140" cy="20" r="10" fill="url(#bubble2)" opacity="0.65" />
            <circle cx="180" cy="90" r="14" fill="url(#bubble1)" opacity="0.7" />
            <circle cx="20" cy="50" r="8" fill="url(#bubble2)" opacity="0.6" />
            <circle cx="100" cy="25" r="7" fill="url(#bubble1)" opacity="0.55" />
            <circle cx="55" cy="100" r="9" fill="url(#bubble2)" opacity="0.65" />
            <circle cx="175" cy="60" r="11" fill="url(#bubble1)" opacity="0.7" />
            <circle cx="85" cy="70" r="6" fill="url(#bubble2)" opacity="0.5" />
            <circle cx="130" cy="100" r="8" fill="url(#bubble1)" opacity="0.6" />
            <circle cx="15" cy="105" r="5" fill="url(#bubble2)" opacity="0.5" />
          </svg>
        </div>
      </div>
      <a
        href="https://meet.google.com/eye-fhww-euu"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50 w-fit mt-auto"
        tabIndex={0}
        aria-label="Rejoindre le webinaire sur la solution de lavage à l'ozone"
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
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        Rejoindre
      </a>
    </div>
  )
}