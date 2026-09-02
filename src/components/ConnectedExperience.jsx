export default function ConnectedExperience({ appImg }) {
  const imgSrc = appImg || '/assets/aurelis-connect-app.jpg'

  const connectedItems = [
    { label: 'REMOTE PRE-CLIMATE', detail: 'Cool or heat the cabin prior to departure via smartphone.' },
    { label: 'DIGITAL KEY PASS', detail: 'Ultra-wideband smartphone entry with guest sharing permissions.' },
    { label: 'REAL-TIME TELEMETRY', detail: 'Monitor battery health, charge rate, and vehicle location worldwide.' },
    { label: 'SMART ROUTE PLANNER', detail: 'Automated trip charging stop routing with live charger availability.' }
  ]

  return (
    <section className="section-padding theme-deep">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow-tag">Ecosystem · 12</span>
            <h2 className="display-title">AURELIS CONNECT.</h2>
            <p className="section-subtitle">Your Vehicle, Always Connected</p>
            <p className="editorial-body">
              The AURELIS companion app gives you effortless remote control over your vehicle. Monitor charging progress, precondition the interior temperature, or unlock the vehicle using encrypted digital key credentials.
            </p>

            <div style={{ width: '100%', height: '240px', borderRadius: '4px', overflow: 'hidden', marginTop: '28px', border: '1px solid var(--color-border-dark)' }}>
              <img src={imgSrc} alt="LK Aurelis Companion Mobile App Telemetry" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          <div>
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '4px' }}>
              <span className="eyebrow-tag" style={{ marginBottom: '16px' }}>SYSTEM STATUS · ONLINE</span>
              {connectedItems.map(item => (
                <div key={item.label} style={{ marginBottom: '20px', borderBottom: '1px solid var(--color-border-dark)', paddingBottom: '16px' }}>
                  <h5 style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-accent-gold)', marginBottom: '4px' }}>{item.label}</h5>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-body)' }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
