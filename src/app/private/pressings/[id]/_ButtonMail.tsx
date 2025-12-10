'use client'

import { Pressing } from "@/models";

export default function ButtonMail({pressing}: {pressing: Pressing}) {
  return (
    <button
      onClick={() => {
        const subject = encodeURIComponent(`Demande d'information - ${pressing.name}`);
        const mailtoLink = `mailto:contact@aventure-immobiliere.com?subject=${subject}`;
        window.open(mailtoLink);
      }}
    >
      Contacter le vendeur
    </button>
  )
}