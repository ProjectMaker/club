import { ImageResponse } from 'next/og'

// Image de partage par défaut (réseaux sociaux, messageries) pour toutes les pages
export const alt = 'Club Laverie - Laveries, pressings et matériel professionnel'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #312e81 100%)',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 700 }}>Club Laverie</div>
        <div style={{ fontSize: 40, marginTop: 24, opacity: 0.85 }}>
          Trouvez votre laverie, pressing ou matériel idéal
        </div>
      </div>
    ),
    size,
  )
}
