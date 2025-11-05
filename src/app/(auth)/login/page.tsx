import type { Metadata } from "next";
import LoginForm from "@/components/pages/LoginForm";

export const metadata: Metadata = {
  title: "Connexion - Club Laverie",
  description: "Connectez-vous à votre compte Club Laverie pour accéder à toutes nos fonctionnalités. Découvrez les meilleures opportunités d'investissement dans les laveries automatiques, pressings et matériel professionnel.",
  keywords: [
    "connexion club laverie",
    "login laverie",
    "se connecter",
    "compte laverie",
    "accès membre",
    "authentification",
    "club laverie login",
    "espace membre",
    "connexion utilisateur"
  ],
  authors: [{ name: "Club Laverie" }],
  creator: "Club Laverie",
  publisher: "Club Laverie",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/login",
    title: "Connexion - Club Laverie",
    description: "Connectez-vous à votre compte Club Laverie pour accéder à toutes nos fonctionnalités et découvrir les meilleures opportunités d'investissement.",
    siteName: "Club Laverie",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connexion - Club Laverie",
    description: "Connectez-vous à votre compte Club Laverie pour accéder à toutes nos fonctionnalités et découvrir les meilleures opportunités d'investissement.",
  },
  alternates: {
    canonical: "/login",
  },
  category: "Business",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 mt-10">
      <LoginForm />
    </div>
  )
}