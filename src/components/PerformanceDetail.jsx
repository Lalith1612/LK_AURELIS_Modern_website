export default function PerformanceDetail() {
  const cards = [
    {
      num: '01',
      title: 'DUAL-MOTOR AWD',
      copy: 'Front and rear permanent magnet synchronous motors deliver continuous torque vectoring across all four wheels in milliseconds.'
    },
    {
      num: '02',
      title: 'ADAPTIVE DYNAMICS',
      copy: 'Triple-chamber adaptive air suspension continuously adjusts damping forces 500 times per second for a velvet ride.'
    },
    {
      num: '03',
      title: 'PRECISION STEERING',
      copy: 'Variable ratio electric power steering delivers tactile feedback and high-speed stability without nervousness.'
    },
    {
      num: '04',
      title: 'ACTIVE AERODYNAMICS',
      copy: 'Motorized front air vanes and active rear spoiler balance low drag cruising with high-speed downforce.'
    },
    {
      num: '05',
      title: 'CARBON-CERAMIC BRAKING',
      copy: '10-piston front calipers and 420mm carbon-ceramic discs ensure fade-free deceleration from high speeds.'
    }
  ]

  return (
    <section className="section-padding theme-dark">
      <div className="container">
        <span className="eyebrow-tag">Vehicle Dynamics · 05</span>
        <h3 className="section-subtitle" style={{ fontSize: '32px' }}>Engineered for Total Control</h3>

        <div className="grid-2" style={{ marginTop: '48px' }}>
          {cards.map((c) => (
            <div key={c.num} className="gallery-card">
              <span className="gallery-card-badge">{c.num} · DYNAMICS</span>
              <h4>{c.title}</h4>
              <p>{c.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
