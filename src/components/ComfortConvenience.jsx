export default function ComfortConvenience() {
  const items = [
    { title: 'DUAL-ZONE CLIMATE', desc: 'Independent temperature zones with HEPA cabin air filtration and ionizer.' },
    { title: 'POWER TAILGATE', desc: 'Hands-free foot sensor gesture activation with programmable opening height.' },
    { title: 'FRONT & REAR STORAGE', desc: '85-liter front frunk plus 520-liter rear cargo space with under-floor storage.' },
    { title: 'DUAL WIRELESS CHARGING', desc: 'Cooled 15W wireless charging pads for driver and front passenger.' }
  ]

  return (
    <section className="section-padding theme-deep">
      <div className="container">
        <span className="eyebrow-tag">Comfort · 16</span>
        <h2 className="display-title">EVERYDAY PRACTICALITY.</h2>
        <p className="editorial-body" style={{ marginBottom: '48px' }}>
          Thoughtfully integrated conveniences designed to make daily grand touring effortless.
        </p>

        <div className="grid-2">
          {items.map(item => (
            <div key={item.title} className="gallery-card">
              <span className="gallery-card-badge">CONVENIENCE</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
