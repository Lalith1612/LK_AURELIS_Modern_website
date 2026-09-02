export default function MaterialsGallery({ materialImages }) {
  const materials = [
    {
      title: 'Graphite Aluminium',
      desc: 'Anodized aluminum trim with micro-machined geometric texture.',
      img: materialImages?.aluminum || '/assets/aurelis-mat-aluminum.jpg'
    },
    {
      title: 'Precision Leather',
      desc: 'Sustainably sourced full-grain leather with diamond perforation.',
      img: materialImages?.leather || '/assets/aurelis-mat-leather.jpg'
    },
    {
      title: 'Acoustic Glass',
      desc: 'Laminated dual-pane acoustic glass with infrared solar rejection.',
      img: materialImages?.glass || '/assets/aurelis-mat-glass.jpg'
    },
    {
      title: 'Hand-Finished Controls',
      desc: 'Knurled metal rotary dials with heavy dampening force.',
      img: materialImages?.controls || '/assets/aurelis-mat-controls.jpg'
    }
  ]

  return (
    <section className="section-padding theme-deep">
      <div className="container">
        <span className="eyebrow-tag">Materials · 10</span>
        <h2 className="display-title">CRAFTED FOR THE JOURNEY.</h2>
        <p className="editorial-body" style={{ marginBottom: '40px' }}>
          Every surface material is selected for durability, tactile warmth, and environmental responsibility.
        </p>

        <div className="design-gallery-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5vw' }}>
          {materials.map(m => (
            <div key={m.title} className="material-card" style={{ padding: '16px', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '140px', overflow: 'hidden', borderRadius: '2px', marginBottom: '16px' }}>
                <img
                  src={m.img}
                  alt={m.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
              </div>
              <h4 style={{ fontSize: '14px', marginBottom: '6px' }}>{m.title}</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
