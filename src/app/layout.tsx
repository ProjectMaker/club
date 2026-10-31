import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { QueryProvider } from "@/contexts/QueryContext";
import Header from "@/components/pages/Header";
import Footer from "@/components/pages/Footer";
import { getUser } from "@/utils/auth";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, organizationJsonLd, websiteJsonLd } from "@/utils/seo";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Club Laverie - Trouvez votre laverie, pressing ou matériel idéal",
    template: "%s | Club Laverie",
  },
  description: "Découvrez les meilleures opportunités d'investissement dans les laveries automatiques. Des emplacements premium, des rendements attractifs. Recherchez et trouvez votre laverie, pressing ou matériel professionnel idéal.",
  keywords: [
    "laverie automatique",
    "pressing",
    "matériel laverie",
    "investissement laverie",
    "achat laverie",
    "vente laverie",
    "laverie professionnelle",
    "machines à laver professionnelles",
    "sécheuses professionnelles",
    "opportunités investissement",
    "laverie self-service",
    "business laverie",
    "club laverie",
  ],
  authors: [{ name: "Club Laverie" }],
  creator: "Club Laverie",
  publisher: "Club Laverie",
  applicationName: "Club Laverie",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
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
    type: "website",
    locale: "fr_FR",
    siteName: "Club Laverie",
    title: "Club Laverie - Trouvez votre laverie, pressing ou matériel idéal",
    description: "Découvrez les meilleures opportunités d'investissement dans les laveries automatiques. Des emplacements premium, des rendements attractifs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Club Laverie - Trouvez votre laverie, pressing ou matériel idéal",
    description: "Découvrez les meilleures opportunités d'investissement dans les laveries automatiques. Des emplacements premium, des rendements attractifs.",
    creator: "@clublaverie",
  },
  // Pas de canonical ici : il serait hérité par toutes les pages qui n'en définissent pas
  category: "Business",
  classification: "Business Directory",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "theme-color": "#1e3a8a",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser()
  
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <QueryProvider>
          <Header user={user} />
          <main className="flex min-h-screen items-start justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 pb-36 sm:pb-24">
            <div className="w-full max-w-7xl px-4">
              {children}
            </div>
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
