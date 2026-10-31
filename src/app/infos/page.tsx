import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/utils/seo";

export const metadata: Metadata = {
  title: { absolute: "Valorisation d'un fonds de commerce de laverie - Guide complet | Club Laverie" },
  description: "Découvrez les méthodes d'évaluation et spécificités du marché des laveries automatiques et avec services en France. Guide complet sur la valorisation d'un fonds de commerce de laverie : barèmes fiscaux, méthodes de comparaison, disparités géographiques et état du marché 2024.",
  keywords: [
    "valorisation laverie",
    "fonds de commerce laverie",
    "évaluation laverie",
    "prix laverie automatique",
    "valeur laverie",
    "estimation laverie",
    "barème fiscal laverie",
    "méthode évaluation laverie",
    "investissement laverie",
    "achat laverie",
    "vente laverie",
    "laverie automatique",
    "laverie avec services",
    "marché laverie France",
    "valorisation fonds commerce",
    "club laverie",
    "guide laverie",
    "baromètre prix laverie",
    "financement laverie",
    "disparités géographiques laverie"
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
    type: "article",
    locale: "fr_FR",
    url: "/infos",
    title: "Valorisation d'un fonds de commerce de laverie - Guide complet | Club Laverie",
    description: "Découvrez les méthodes d'évaluation et spécificités du marché des laveries automatiques et avec services en France. Guide complet sur la valorisation d'un fonds de commerce de laverie.",
    siteName: "Club Laverie",
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE],
    card: "summary_large_image",
    title: "Valorisation d'un fonds de commerce de laverie - Guide complet | Club Laverie",
    description: "Découvrez les méthodes d'évaluation et spécificités du marché des laveries automatiques et avec services en France.",
  },
  alternates: {
    canonical: "/infos",
  },
  category: "Business",
};

export default function Infos() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Comment valoriser un fonds de commerce de laverie
      </h1>
      <p className="text-lg text-white/80 mb-8 leading-relaxed">
        Méthodes d&apos;évaluation et spécificités du marché des laveries automatiques et avec services en France
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          1. Introduction à la valorisation d&apos;une laverie
        </h2>
        <div className="text-white/90 leading-relaxed space-y-4">
          <p className="text-base">
            L&apos;estimation d&apos;un fonds de commerce constitue une étape essentielle avant toute cession.
            Cette démarche obéit à des règles générales (communes à tous les secteurs d&apos;activité) et à des règles sectorielles, propres à chaque métier.
          </p>
          <p className="text-base">
            Le secteur des laveries automatiques et laveries avec services représente un marché particulièrement dense en France, notamment dans les grandes agglomérations.
          </p>
          <p className="text-base font-semibold text-yellow-300">
            Question centrale :
          </p>
          <p className="text-base">
            👉 Selon quels critères peut-on fixer le prix de cession d&apos;une laverie automatique ou d&apos;une laverie avec services ?
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          2. Éléments constitutifs d&apos;une laverie
        </h2>
        <div className="text-white/90 leading-relaxed space-y-4">
          <p className="text-base font-semibold text-purple-300">
            Éléments corporels
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-base">
            <li>Machines à laver</li>
            <li>Séchoirs et centrale de paiement</li>
            <li>Autres équipements techniques</li>
          </ul>

          <p className="text-base font-semibold text-purple-300 mt-6">
            Éléments incorporels
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-base">
            <li>Enseigne</li>
            <li>Droit au bail commercial</li>
            <li>Clientèle</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          3. Méthodes financières d&apos;évaluation
        </h2>
        <p className="text-base text-white/90 leading-relaxed mb-4">
          Sur le plan économique, la valorisation d&apos;une laverie repose sur plusieurs méthodes reconnues :
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3 text-green-300">
              3.1 Le modèle des barèmes
            </h3>
            <p className="text-base text-white/90 leading-relaxed">
              Méthode privilégiée par l&apos;administration fiscale : application d&apos;un coefficient multiplicateur au chiffre d&apos;affaires annuel.
              ⚠️ Peu fiable dans le cas des laveries, car elle ignore la valeur réelle du matériel et la dynamique du marché.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3 text-green-300">
              3.2. La valorisation selon la rentabilité
            </h3>
            <p className="text-base text-white/90 leading-relaxed">
              Méthode retenue par les banques, basée sur l&apos;excédent brut d&apos;exploitation (EBE).
              Elle évalue la capacité de remboursement de l&apos;entreprise.
              Cependant, les laveries automatiques restent peu financées par les établissements bancaires.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3 text-green-300">
              3.3. La méthode par comparaison
            </h3>
            <p className="text-base text-white/90 leading-relaxed">
              La plus pertinente dans ce secteur : comparaison avec des affaires similaires récemment cédées.
              ✅ Méthode privilégiée par les professionnels, car le marché des laveries est très fluctuant.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3 text-green-300">
              3.4. La méthode par actif net corrigé
            </h3>
            <p className="text-base text-white/90 leading-relaxed">
              Évaluation du patrimoine réel de l&apos;entreprise (machines, licences, créances, dettes…).
              Utile pour les analyses patrimoniales approfondies.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          4. Baromètre des prix 2024 – Secteur parisien
        </h2>
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-6 mb-4">
          <div className="text-white/90 space-y-2 text-base">
            <p><span className="font-semibold text-blue-300">Méthode / Référence</span> Taux de valorisation du CA TTC</p>
            <p><span className="font-semibold text-blue-300">Barème fiscal théorique</span> 80 % à 120 %</p>
            <p><span className="font-semibold text-blue-300">Prix observés sur le marché</span> 150 % à 200 %</p>
          </div>
        </div>
        <p className="text-base text-white/90 leading-relaxed">
          💬 Analyse : Le barème administratif sous-évalue la réalité du marché.
          La forte demande des investisseurs et la valeur du matériel expliquent des prix de vente supérieurs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          5. Spécificités du secteur des laveries
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3 text-green-300">
              5.1. Importance de la localisation
            </h3>
            <div className="text-white/90 leading-relaxed space-y-3">
              <p className="text-base">
                Contrairement à d&apos;autres commerces, une laverie peut fonctionner sur un emplacement secondaire.
                Les clients se déplacent par nécessité, à condition que la laverie reste proche des zones résidentielles.
              </p>
              <p className="text-base">
                💡 Règle d&apos;or : privilégier un loyer modéré.
                Le loyer doit idéalement rester inférieur à 1 500 € par mois, ajusté selon la surface et le quartier.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3 text-green-300">
              5.2. Typologie des laveries
            </h3>
            <div className="text-white/90 leading-relaxed space-y-3">
              <p className="text-base font-semibold text-purple-300">
                Laveries avec services
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-base">
                <li>Prestations : repassage, couture, pressing</li>
                <li>Nécessitent du personnel</li>
                <li>Valorisation classique : 80 % à 120 % du CA TTC</li>
              </ul>
              <p className="text-base font-semibold text-purple-300 mt-4">
                Laveries automatiques
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-base">
                <li>Fonctionnement autonome (sans personnel)</li>
                <li>Prix souvent supérieurs aux barèmes fiscaux</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          6. Disparités géographiques
        </h2>
        <p className="text-base text-white/90 leading-relaxed mb-4">
          <span className="font-semibold text-blue-300">Zone géographique</span> Niveau de valorisation
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-base text-white/90">
          <li><span className="font-semibold text-purple-300">Paris & Ouest parisien</span> : Très élevés</li>
          <li><span className="font-semibold text-purple-300">Île-de-France</span> : Élevés</li>
          <li><span className="font-semibold text-purple-300">Grandes villes de province</span> : Modérés</li>
          <li><span className="font-semibold text-purple-300">Petites villes & zones rurales</span> : Faibles</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          7. Pourquoi les laveries automatiques sont-elles mieux valorisées ?
        </h2>
        <p className="text-base text-white/90 leading-relaxed mb-4">
          Typologie des acheteurs : investisseurs non professionnels du secteur.
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-base text-white/90">
          <li>Investisseurs non professionnels du secteur</li>
          <li>Fonctionnement autonome (sans personnel)</li>
          <li>Prix souvent supérieurs aux barèmes fiscaux</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          8. Financement et réticence bancaire
        </h2>
        <div className="text-white/90 leading-relaxed space-y-4">
          <p className="text-base">
            Les banques se montrent prudentes, car les prix du marché dépassent souvent la valeur comptable réelle.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-base">
            <li>Critères privilégiés : rentabilité mesurable, EBE, solidité du business plan</li>
            <li>Méfiance : envers les transactions justifiées uniquement par la rareté de l&apos;offre</li>
          </ul>
          <p className="text-base">
            ➡️ Toutefois, les montants absolus restent abordables, ce qui maintient un marché actif.
            Méfiance : envers les transactions justifiées uniquement par la rareté de l&apos;offre.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          9. État du marché des laveries automatiques
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4 text-base text-white/90 mb-4">
          <li>Tendances actuelles</li>
          <li>Forte demande d&apos;acquéreurs</li>
          <li>Offre limitée de biens à céder</li>
          <li>Prix en hausse liée à la tension du marché</li>
          <li>Secteur dynamique et attractif</li>
        </ul>

        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-xl p-6">
          <p className="text-base text-white/90 leading-relaxed italic">
            Témoignage du spécialiste du secteur – M. Paris, agent immobilier :
            « Le marché se porte bien ! Les acquéreurs sont nombreux, ce sont les produits disponibles qui manquent. »
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-blue-300">
          10. Conclusion
        </h2>
        <div className="text-white/90 leading-relaxed space-y-4">
          <p className="text-base">
            La valorisation d&apos;un fonds de commerce de laverie (avec ou sans services) nécessite une analyse fine et contextualisée.
            Les méthodes classiques d&apos;évaluation doivent être adaptées aux spécificités du secteur :
            localisation, type d&apos;exploitation, niveau du loyer, et dynamique géographique.
          </p>
          <p className="text-base">
            Malgré une certaine réticence bancaire, le marché demeure solide et attractif.
            Les vendeurs comme les acquéreurs doivent donc s&apos;appuyer sur des données objectives et comparatives pour garantir une transaction équilibrée et réaliste.
          </p>
        </div>
      </section>
    </div>
  )
}