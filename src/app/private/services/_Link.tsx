'use client'

export default function LinkService({ service, label, redirectUrl }: { service: string, label: string, redirectUrl: string }) {
  const handleLinkClick = () => {
    fetch('/api/track-service-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        service
      }),
    }).catch(err => console.error("Le tracking a échoué en silence", err))

    if (redirectUrl) {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <button
      onClick={handleLinkClick}
      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50 w-fit mt-auto"
    >
      {label}
    </button>
  )
}