const Calendly = () => {
  return (
    <div className="my-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">
            Besoin de clarifier votre projet de laverie ?
          </h2>
          <p className="text-white/70">
            Consultation individuelle de 45 min • 150 EUR
          </p>
        </div>
        <a
          href="https://calendly.com/raphael-pariscommerce/45min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
          tabIndex={0}
          aria-label="Réserver une consultation sur Calendly"
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
          Réserver une consultation
        </a>
      </div>
    </div>
  )
}

export default Calendly