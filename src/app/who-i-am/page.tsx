import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/utils/seo";

export const metadata: Metadata = {
  title: { absolute: "Qui sommes-nous ? - Le Club Laverie | Votre communauté de professionnels du lavage" },
  description: "Découvrez le Club Laverie, une communauté de plus de 1500 membres spécialisés dans les laveries automatiques, pressings et lavages autos. Accompagnement personnalisé, tarifs exclusifs et réseau de spécialistes.",
  keywords: [
    "club laverie",
    "communauté laverie",
    "réseau laverie",
    "accompagnement laverie",
    "achat laverie",
    "vente laverie",
    "création laverie",
    "matériel laverie",
    "pressing",
    "lavage auto",
    "laverie automatique",
    "professionnels laverie",
    "investissement laverie",
    "conseil laverie",
    "formation laverie"
  ],
  authors: [{ name: "Club Laverie" }],
  creator: "Club Laverie",
  publisher: "Club Laverie",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    type: "website",
    locale: "fr_FR",
    url: "/who-i-am",
    title: "Qui sommes-nous ? - Le Club Laverie | Votre communauté de professionnels du lavage",
    description: "Découvrez le Club Laverie, une communauté de plus de 1500 membres spécialisés dans les laveries automatiques, pressings et lavages autos.",
    siteName: "Club Laverie",
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE],
    card: "summary_large_image",
    title: "Qui sommes-nous ? - Le Club Laverie | Votre communauté de professionnels du lavage",
    description: "Découvrez le Club Laverie, une communauté de plus de 1500 membres spécialisés dans les laveries automatiques, pressings et lavages autos.",
  },
  alternates: {
    canonical: "/who-i-am",
  },
  category: "Business",
};

export default function WhoIAm() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Qui sommes-nous ?
      </h1>
      <p className="text-lg text-white/80 mb-8 leading-relaxed">
        Une communauté passionnée au service des professionnels du lavage en France
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          🏠 Une communauté unique
        </h2>
        <div className="text-white/90 leading-relaxed space-y-4">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-6 mb-4">
            <p className="text-2xl font-bold text-blue-300 mb-2">+ de 1 500 membres</p>
            <p className="text-base text-white/90">
              inscrits et actifs sur toute la France
            </p>
          </div>
          <p className="text-base">
            Le Club Laverie est avant tout une communauté de primo-accédants et multipropriétaires de
            <span className="font-semibold text-purple-300"> laveries automatiques</span>,
            <span className="font-semibold text-purple-300"> pressings</span> et
            <span className="font-semibold text-purple-300"> lavages autos</span> répartis sur toute la France.
          </p>
          <p className="text-base">
            👥 Chaque semaine, de nouveaux membres rejoignent le Club Laverie afin de bénéficier des conseils et du réseau de nos spécialistes.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          🤝 Accompagnement personnalisé
        </h2>
        <div className="text-white/90 leading-relaxed space-y-4">
          <p className="text-base">
            Vous pouvez profiter d&apos;un accompagnement sur-mesure pour :
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-base">
            <li><span className="font-semibold text-green-300">La vente</span> de votre fonds de commerce</li>
            <li><span className="font-semibold text-green-300">L&apos;achat</span> d&apos;une laverie, pressing ou lavage auto</li>
            <li><span className="font-semibold text-green-300">La création</span> de votre nouvelle affaire</li>
          </ul>
          <p className="text-base font-semibold text-yellow-300 mt-4">
            ⭐ Avantage exclusif :
          </p>
          <p className="text-base">
            Vous avez accès à toutes les offres de reprises et de cessions <span className="font-semibold text-purple-300">en priorité</span>.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          💰 Tarifs exclusifs et offres promotionnelles
        </h2>
        <div className="text-white/90 leading-relaxed space-y-4">
          <p className="text-base">
            Le Club Laverie vous permet de bénéficier en exclusivité de tarifs attractifs et d&apos;offres promotionnelles sur :
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-base font-semibold text-purple-300">
                Matériel professionnel
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-base">
                <li>Matériel neuf <span className="text-green-300 font-semibold">toutes marques</span></li>
                <li>Matériel d&apos;occasion</li>
              </ul>
            </div>

            <div>
              <p className="text-base font-semibold text-purple-300">
                Produits annexes
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-base">
                <li>Distributeurs de boissons</li>
                <li>Distributeurs alimentaires</li>
                <li>Wash Dog</li>
                <li>Lockers</li>
              </ul>
            </div>

            <div>
              <p className="text-base font-semibold text-purple-300">
                Consommables
              </p>
              <p className="text-base ml-4">
                🧴 Des offres ponctuelles sur les consommables comme la lessive par exemple.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          ⚖️ Services professionnels et expertise
        </h2>
        <div className="text-white/90 leading-relaxed space-y-4">
          <p className="text-base">
            Le Club Laverie c&apos;est également la possibilité d&apos;accéder à :
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-4">
              <p className="font-semibold text-green-300 mb-2">⚖️ Avocats spécialisés</p>
              <p className="text-sm">Experts dans le domaine du lavage</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-xl p-4">
              <p className="font-semibold text-blue-300 mb-2">🛡️ Assurances spécifiques</p>
              <p className="text-sm">Contrats adaptés à votre activité</p>
            </div>
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-xl p-4">
              <p className="font-semibold text-amber-300 mb-2">⚡ Audits énergétiques</p>
              <p className="text-sm">Optimisez votre consommation</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl p-4">
              <p className="font-semibold text-purple-300 mb-2">📊 Valorisations gratuites</p>
              <p className="text-sm">Par notre agence spécialisée</p>
            </div>
          </div>
          <p className="text-base mt-4">
            🔧 <span className="font-semibold text-green-300">Solutions techniques</span> lorsque vous rencontrez des difficultés d&apos;exploitation, de création ou de rénovation.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          🎓 Formation et Webinaires
        </h2>
        <div className="text-white/90 leading-relaxed space-y-4">
          <p className="text-base">
            Le Club vous donnera également accès au fil de l&apos;année à des <span className="font-semibold text-purple-300">Webinaires</span> sur des sujets variés :
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold">
              🔧 Technique
            </span>
            <span className="bg-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold">
              ⚖️ Juridique
            </span>
            <span className="bg-green-500/30 text-green-300 px-4 py-2 rounded-full text-sm font-semibold">
              📈 Marketing
            </span>
            <span className="bg-amber-500/30 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold">
              💵 Financier
            </span>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/40 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            🚀 En résumé
          </h2>
          <p className="text-lg text-white/90 leading-relaxed text-center">
            Le <span className="font-bold text-blue-300">Club Laverie</span> est un <span className="font-bold text-purple-300">facilitateur de développement</span> de votre activité de lavage, en constante recherche de <span className="font-semibold text-green-300">nouvelles offres</span> et <span className="font-semibold text-green-300">nouvelles solutions</span>.
          </p>
        </div>
      </section>
    </div>
  );
}

