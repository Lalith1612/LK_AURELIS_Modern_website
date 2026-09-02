export default function InteriorExperience({ interiorImg }) {
  const cabinFeatures = [
    {
      title: 'COCKPIT',
      desc: 'Driver-focused curved dual OLED display environment with tactile knurled aluminum physical volume dial.'
    },
    {
      title: 'SEATING',
      desc: '18-way power adjustable ventilated sport seats upholstered in precision-perforated sustainable leather.'
    },
    {
      title: 'AMBIENT LIGHTING',
      desc: 'Architecturally integrated ambient light channels with 64 dynamic color themes.'
    },
    {
      title: 'PANORAMIC ROOF',
      desc: 'Continuous electrochromic glass roof with adjustable solar tint levels.'
    }
  ]

  return (
    <section id="interior" className="section-padding theme-dark">
      <div className="container">
        <span className="eyebrow-tag">Interior Sanctuary · 09</span>
        <h2 className="display-title">A CABIN DESIGNED AROUND YOU.</h2>
        <p className="editorial-body">
          A harmonious blend of physical tactile controls and digital screens. Designed to eliminate distraction while offering total acoustic and spatial comfort for four adults.
        </p>

        <div className="media-banner" style={{ height: 'min(50vw, 540px)' }}>
          <img src={interiorImg} alt="LK Aurelis Luxury EV Interior Cockpit" />
        </div>

        <div className="design-gallery-grid" style={{ marginTop: '40px' }}>
          {cabinFeatures.map(item => (
            <div key={item.title} className="gallery-card">
              <span className="gallery-card-badge">INTERIOR · DETAIL</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
