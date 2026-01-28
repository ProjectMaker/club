import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultation - Clarifier votre projet de laverie | Club Laverie",
  description:
    "Consultation individuelle de 45 minutes pour clarifier votre projet de laverie. Bénéficiez de plus de 20 ans d'expérience terrain pour structurer vos options et prendre les bonnes décisions.",
};

const OBJECTIVES = [
  "Clarifier les points clés de votre projet",
  "Structurer vos options et priorités",
  "Confronter vos hypothèses à la réalité du terrain",
  "Vous aider à décider sereinement et efficacement de la suite à donner à votre projet",
];

const CalendlyPage = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-white/80">Consultation en ligne</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Clarifier votre projet de{" "}
            <span className="text-blue-300">laverie</span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <ClockIcon />
              <span className="text-white font-medium">45 min</span>
            </div>
            <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-green-400/30">
              <EuroIcon />
              <span className="text-green-300 font-bold text-lg">150 EUR</span>
            </div>
            <a
              href="https://calendly.com/raphael-pariscommerce/45min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-5 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
              tabIndex={0}
              aria-label="Réserver une consultation sur Calendly"
            >
              <CalendarIcon />
              Réserver
            </a>
          </div>
        </header>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          {/* Info Badge */}
          <div className="flex items-start gap-3 bg-blue-500/20 rounded-xl p-4 mb-8 border border-blue-400/30">
            <InfoIcon />
            <p className="text-blue-200 text-sm">
              Informations sur la conférence en ligne fournies à la
              confirmation.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-6 text-white/90 leading-relaxed">
            <p className="text-lg">
              Chaque projet de laverie est{" "}
              <strong className="text-white">unique</strong>, avec ses
              spécificités, ses enjeux et ses choix stratégiques à arbitrer.
            </p>

            <p>
              Cette consultation individuelle est un temps d&apos;échange
              structuré pour prendre de la hauteur, organiser votre réflexion et
              affiner votre vision du projet.
            </p>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="text-white/80 italic">
                L&apos;entretien s&apos;appuie sur{" "}
                <span className="text-purple-300 font-semibold not-italic">
                  plus de 20 ans d&apos;expérience terrain
                </span>{" "}
                dans la laverie, afin de confronter votre réflexion aux réalités
                du métier et vous apporter des repères concrets et
                opérationnels.
              </p>
            </div>
          </div>

          {/* Objectives Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <TargetIcon />
              Objectifs de la séance
            </h2>

            <ul className="space-y-4">
              {OBJECTIVES.map((objective, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors duration-200"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                    <CheckIcon />
                  </span>
                  <span className="text-white/90">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* When Section */}
          <div className="mt-10 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-6 border border-purple-400/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              Quand prendre rendez-vous ?
            </h3>
            <p className="text-white/80 leading-relaxed">
              Cette consultation peut intervenir à différents moments de votre
              parcours :{" "}
              <span className="text-blue-300">en phase de réflexion</span>,{" "}
              <span className="text-green-300">avant un engagement</span>, ou
              simplement pour{" "}
              <span className="text-purple-300">
                faire un point stratégique
              </span>
              .
            </p>
          </div>

          {/* Closing Statement */}
          <div className="mt-10 text-center">
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              C&apos;est un échange <strong className="text-white">personnalisé</strong>, centré sur votre
              situation, vos contraintes et vos objectifs, pour avancer avec{" "}
              <span className="text-blue-300">clarté</span> et{" "}
              <span className="text-green-300">lucidité</span>.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-center">
            <a
              href="https://calendly.com/raphael-pariscommerce/45min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
              tabIndex={0}
              aria-label="Réserver une consultation sur Calendly"
            >
              <CalendarIcon />
              Réserver ma consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-white/80"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const EuroIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-green-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TargetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7 text-purple-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-green-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
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
);

export default CalendlyPage;

