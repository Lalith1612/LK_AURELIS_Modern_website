export default function EngineeringSection({ engImages }) {
  const features = [
    {
      num: '01',
      title: 'DUAL-MOTOR AWD',
      copy: 'Instant torque. Intelligent distribution across front and rear axles for seamless traction in all weather.',
      img: engImages?.awd || '/assets/aurelis-eng-awd.jpg'
    },
    {
      num: '02',
      title: 'ACTIVE AERODYNAMICS',
      copy: 'Airflow shaped around performance and stability. Active front shutters and rear diffuser reduce drag.',
      img: engImages?.aero || '/assets/aurelis-eng-aero.jpg'
    },
    {
      num: '03',
      title: 'ADAPTIVE AIR SUSPENSION',
      copy: 'A composed ride at every speed. Height-adjustable air springs with continuous damping control.',
      img: engImages?.suspension || '/assets/aurelis-eng-suspension.jpg'
    },
    {
      num: '04',
      title: 'CARBON-CERAMIC BRAKING',
      copy: 'Confident stopping power under demanding track conditions with high thermal tolerance.',
      img: engImages?.braking || '/assets/aurelis-eng-braking.jpg'
    }
  ]

  return (
    <section id="engineering" className="section-padding theme-deep">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'start', marginBottom: '48px' }}>
          <div>
            <span className="eyebrow-tag">03 · ENGINEERING</span>
            <h2 className="display-title">
              ENGINEERED<br />IN<br />SILENCE.
            </h2>
          </div>
          <div>
            <p className="editorial-body">
              Advanced technologies working in perfect unison to deliver unmatched refinement, acoustic isolation, and high-speed control.
            </p>
          </div>
        </div>

        {/* Supporting Engineering Visual Cards Below Text */}
        <div className="design-gallery-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5vw' }}>
          {features.map(f => (
            <div key={f.num} className="gallery-card" style={{ padding: '16px' }}>
              <div style={{ width: '100%', height: '160px', overflow: 'hidden', borderRadius: '2px', marginBottom: '16px' }}>
                <img
                  src={f.img}
                  alt={f.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span className="gallery-card-badge">{f.num} · {f.title}</span>
              <h4 style={{ fontSize: '13px', letterSpacing: '0.08em', marginBottom: '8px' }}>{f.title}</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>{f.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
