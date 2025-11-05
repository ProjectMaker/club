'use client'

const ButtonEmail = () => {
  const handleEmailClick = () => {
    const subject = encodeURIComponent("Contact depuis Club Laverie")
    const body = encodeURIComponent("Bonjour,\n\nJe vous contacte depuis Club Laverie.\n\nCordialement,")
    window.location.href = `mailto:contact@clublaverie.com?subject=${subject}&body=${body}`
  }

  return (
    <button
          onClick={handleEmailClick}
          className="flex flex-row items-center gap-3 py-3 px-6 text-white font-medium rounded-lg transition-colors cursor-pointer bg-blue-500 hover:bg-blue-600"
          tabIndex={0}
          aria-label="Ouvrir la boîte mail pour nous contacter"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleEmailClick()
            }
          }}
        >
          <svg
            className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>Nous Contacter</span>
        </button>
  )
}

export default ButtonEmail;