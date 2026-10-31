// Données structurées schema.org ; on échappe "<" pour qu'un contenu ne puisse pas fermer la balise script
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
