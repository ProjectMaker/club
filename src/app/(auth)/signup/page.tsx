import type { Metadata } from "next";
import SignUpForm from "@/components/pages/SignUpForm";

export const metadata: Metadata = {
	title: "Inscription - Club Laverie",
	description: "Créez votre compte Club Laverie et rejoignez notre plateforme pour accéder aux meilleures opportunités d'investissement dans les laveries automatiques, pressings et matériel professionnel. Trouvez votre projet idéal.",
	keywords: [
		"inscription club laverie",
		"créer compte laverie",
		"s'inscrire",
		"compte laverie",
		"membre laverie",
		"inscription utilisateur",
		"club laverie signup",
		"rejoindre club laverie",
		"opportunités investissement laverie",
		"laverie automatique",
		"pressing",
		"matériel laverie professionnel"
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
		url: "/signup",
		title: "Inscription - Club Laverie",
		description: "Rejoignez notre plateforme pour accéder aux meilleures opportunités d'investissement dans les laveries automatiques et trouvez votre projet idéal.",
		siteName: "Club Laverie",
	},
	twitter: {
		card: "summary_large_image",
		title: "Inscription - Club Laverie",
		description: "Rejoignez notre plateforme pour accéder aux meilleures opportunités d'investissement dans les laveries automatiques et trouvez votre projet idéal.",
	},
	alternates: {
		canonical: "/signup",
	},
	category: "Business",
};

export default function SignUpPage() {
	return (
		<div className="flex flex-col items-center justify-center text-center">
			<SignUpForm />
		</div>
	);
}