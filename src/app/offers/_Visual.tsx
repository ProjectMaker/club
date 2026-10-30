// Image d'une offre, ou visuel par défaut (dégradé + icône) tant qu'aucune image n'est fournie
export default function Visual({ image, alt, icon, className = '' }: {
  image?: string
  alt: string
  icon: React.ReactNode
  className?: string
}) {
  if (image) {
    return <img src={image} alt={alt} className={`w-full h-full object-cover ${className}`} />
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/40 via-indigo-500/30 to-sky-400/30 text-white/70 ${className}`}
    >
      <div className="scale-[2]">{icon}</div>
    </div>
  )
}
