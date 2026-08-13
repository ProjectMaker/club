const contactLinks = [
  {
    label: "01 60 02 76 24",
    href: "tel:+33160027624",
    ariaLabel: "Appeler le 01 60 02 76 24",
  },
  {
    label: "06 62 51 57 95",
    href: "tel:+33662515795",
    ariaLabel: "Appeler le 06 62 51 57 95",
  },
  {
    label: "contact@aventure-immobiliere.fr",
    href: "mailto:contact@aventure-immobiliere.fr?subject=contact",
    ariaLabel: "Envoyer un email à contact@aventure-immobiliere.fr",
  },
];

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-white/20 bg-blue-950/95 px-4 py-3 text-white shadow-2xl backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 text-center text-sm sm:flex-row sm:gap-6">
        <p className="font-semibold">Raphael Paris</p>
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-label={link.ariaLabel}
              className="rounded-md text-white/85 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-blue-950"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
