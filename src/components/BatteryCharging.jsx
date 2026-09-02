export default function BatteryCharging({ chargingImg }) {
  return (
    <section className="section-padding theme-deep">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow-tag">Energy & Charging · 08</span>
            <h2 className="display-title">720 KM RANGE.<br />FAST DC CHARGING.</h2>
            <p className="section-subtitle">Effortless Long-Distance Touring</p>
            <p className="editorial-body">
              Designed for continuous continental travel. Peak charging rates up to 300 kW DC enable a 10% to 80% charge in just 18 minutes. Active battery liquid cooling preserves battery health and guarantees repeated fast charging performance.
            </p>

            <div style={{ display: 'flex', gap: '32px', marginTop: '36px' }}>
              <div>
                <span className="eyebrow-tag" style={{ marginBottom: '8px' }}>10–80% CHARGE</span>
                <strong style={{ fontSize: '32px', fontWeight: '300', color: 'var(--color-accent-gold)' }}>18 Min</strong>
              </div>
              <div>
                <span className="eyebrow-tag" style={{ marginBottom: '8px' }}>PEAK RATE</span>
                <strong style={{ fontSize: '32px', fontWeight: '300', color: 'var(--color-accent-gold)' }}>300 kW DC</strong>
              </div>
            </div>
          </div>

          <div>
            <div className="media-banner" style={{ marginTop: '0', height: '400px' }}>
              <img src={chargingImg} alt="Aurelis Ultra-Fast DC Charging Station" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
