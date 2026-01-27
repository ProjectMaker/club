import Link from "next/link";

const WhoIAmSummary = () => {
  const highlights = [
    {
      icon: "👥",
      title: "+ de 1 500 membres",
      description: "Communauté active de propriétaires et investisseurs en France",
    },
    {
      icon: "🤝",
      title: "Accompagnement",
      description: "Aide personnalisée pour l'achat, la vente ou la création",
    },
    {
      icon: "💰",
      title: "Tarifs exclusifs",
      description: "Offres promotionnelles sur le matériel neuf et d'occasion",
    },
    {
      icon: "⚖️",
      title: "Services experts",
      description: "Avocats, assurances, audits et valorisations gratuites",
    },
  ];

  return (
    <section
      className="py-12 px-4"
      aria-labelledby="who-i-am-summary-title"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h2
                id="who-i-am-summary-title"
                className="text-2xl md:text-3xl font-bold text-white mb-2"
              >
                🏠 Rejoignez le{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Club Laverie
                </span>
              </h2>
              <p className="text-white/70 text-lg">
                Votre communauté de professionnels du lavage en France
              </p>
            </div>
            <Link
              href="/who-i-am"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 whitespace-nowrap"
              aria-label="Découvrir qui nous sommes et nos services"
              tabIndex={0}
            >
              Découvrir le club
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="bg-slate-800/50 border border-slate-700/30 rounded-xl p-5 hover:bg-slate-700/50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                    <span className="text-lg" aria-hidden="true">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white text-sm">
                    {item.title}
                  </h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <p className="text-white/50 text-sm text-center">
              🚀 Un facilitateur de développement de votre activité de lavage, en constante recherche de nouvelles offres et solutions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIAmSummary;

