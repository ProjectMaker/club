const SalesLoading = () => {
  return (
    <section id="annonces" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-white text-center mb-12">
          Annonces à la une
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Skeleton cards */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-pulse"
            >
              {/* Image skeleton */}
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <div className="w-full h-48 bg-white/20 rounded-lg"></div>
                {/* Type badge skeleton */}
                <div className="absolute top-2 left-2 bg-white/20 rounded-full w-16 h-6"></div>
              </div>

              {/* Title skeleton */}
              <div className="h-6 bg-white/20 rounded mb-2 w-3/4"></div>

              {/* Button skeleton */}
              <div className="h-10 bg-white/20 rounded-lg w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SalesLoading 