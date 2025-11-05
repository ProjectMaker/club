import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { QueryProvider } from "@/contexts/QueryContext";
import Header from "@/components/pages/Header";
import { getUser } from "@/utils/auth";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
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
  manifest: "/manifest.json",
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
    url: "/",
    siteName: "Club Laverie",
    title: "Club Laverie - Trouvez votre laverie, pressing ou matériel idéal",
    description: "Découvrez les meilleures opportunités d'investissement dans les laveries automatiques. Des emplacements premium, des rendements attractifs.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Club Laverie - Plateforme d'investissement en laveries automatiques",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Club Laverie - Trouvez votre laverie, pressing ou matériel idéal",
    description: "Découvrez les meilleures opportunités d'investissement dans les laveries automatiques. Des emplacements premium, des rendements attractifs.",
    images: ["/og-image.png"],
    creator: "@clublaverie",
  },
  alternates: {
    canonical: "/",
  },
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
        <QueryProvider>
          <Header user={user} />
          <div className=" flex items-start justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900  min-h-screen">
            <div className="w-full max-w-7xl px-4">
              {children}
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
