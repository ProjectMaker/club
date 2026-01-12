'use client'
import { Laundry  } from "@/models";

export default function ButtonMail({laundry}: {laundry: Laundry}) {
    return (
        <button
            onClick={() => {
                const subject = encodeURIComponent(`Demande d'information - ${laundry.name}`);
                const mailtoLink = `mailto:contact@aventure-immobiliere.fr?subject=${subject}`;
                window.open(mailtoLink);
            }}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold transition-colors"
        >
            Contacter le vendeur
        </button>
    )
}