export default function TechnologySection({ techImg }) {
  const imgSrc = techImg || '/assets/aurelis-tech-cockpit.jpg'

  const techFeatures = [
    { title: 'DUAL OLED DISPLAY', desc: '14.6-inch high-resolution instrument cluster and central infotainment screen.' },
    { title: 'AURELIS OS', desc: 'Custom real-time operating system powered by dual neural processing units.' },
    { title: 'OVER-THE-AIR UPDATES', desc: 'Continuous software improvements for drivetrain, infotainment, and ADAS.' },
    { title: '5G CONNECTIVITY', desc: 'Real-time traffic telemetry, cloud route planning, and high-speed streaming.' }
  ]

  return (
    <section id="technology" className="section-padding theme-dark">
      <div className="container">
        <span className="eyebrow-tag">Technology · 11</span>
        <h2 className="display-title">INTELLIGENCE, BEAUTIFULLY INTEGRATED.</h2>
        <p className="editorial-body" style={{ marginBottom: '40px' }}>
          Seamless technology designed to assist without intruding. Responsive digital architecture built on high-speed ethernet networks.
        </p>

        <div className="media-banner" style={{ height: 'min(42vw, 460px)', marginBottom: '40px' }}>
          <img src={imgSrc} alt="LK Aurelis Dual OLED Digital Cockpit Environment" loading="lazy" />
        </div>

        <div className="grid-2">
          {techFeatures.map(f => (
            <div key={f.title} className="gallery-card">
              <span className="gallery-card-badge">DIGITAL COCKPIT</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
