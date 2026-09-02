export default function ExteriorGallery({ galleryImages }) {
  const items = [
    {
      badge: '01 · FRONT',
      title: 'Lighting Signature',
      desc: 'Full-width illuminated lightbar and active cooling shutter intake.',
      img: galleryImages?.front || '/assets/aurelis-ext-front.jpg'
    },
    {
      badge: '02 · PROFILE',
      title: 'Grand Tourer Stance',
      desc: 'Seamless flush door handles and low roofline for minimum aerodynamic drag.',
      img: galleryImages?.profile || '/assets/aurelis-ext-profile.jpg'
    },
    {
      badge: '03 · REAR',
      title: 'Full-Width Lightbar',
      desc: 'Sculpted rear diffuser with active air management channels.',
      img: galleryImages?.rear || '/assets/aurelis-ext-rear.jpg'
    },
    {
      badge: '04 · WHEELS',
      title: 'Forged Aero Alloys',
      desc: 'Precision 22-inch forged aluminum wheels with aero blade inserts.',
      img: galleryImages?.wheels || '/assets/aurelis-ext-wheels.jpg'
    }
  ]

  return (
    <section className="section-padding theme-deep" style={{ paddingTop: '0' }}>
      <div className="container">
        <span className="eyebrow-tag">Exterior Highlights · 03</span>
        <h3 className="section-subtitle" style={{ fontSize: '28px' }}>Architectural Form & Precision</h3>
        
        <div className="design-gallery-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5vw' }}>
          {items.map((item) => (
            <div key={item.badge} className="gallery-card" style={{ padding: '16px', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '160px', overflow: 'hidden', borderRadius: '2px', marginBottom: '16px' }}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
              </div>
              <span className="gallery-card-badge">{item.badge}</span>
              <h4 style={{ fontSize: '14px', marginBottom: '6px' }}>{item.title}</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
