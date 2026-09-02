export default function PerformanceSection() {
  return (
    <section id="performance" className="section-padding theme-light">
      <div className="container">
        <div className="grid-2">
          <div>
            <span className="eyebrow-tag">Performance · 04</span>
            <h2 className="display-title" style={{ color: 'var(--color-text-dark)' }}>
              EFFORTLESSLY<br />QUICK.
            </h2>
          </div>
          <div>
            <p className="editorial-body" style={{ color: var_color_text_dark_muted() }}>
              Instant dual-motor torque delivers unrelenting acceleration without vibration or noise. Engineered to maintain high output across repeated hard launches and high-speed cruising.
            </p>
          </div>
        </div>

        <div className="spec-metrics-grid">
          <div className="spec-metric-card">
            <span className="label">0–100 km/h</span>
            <div className="val">
              <span className="spec-val" data-target="3.4" data-decimals="1">0.0</span>
              <span className="unit">s</span>
            </div>
          </div>

          <div className="spec-metric-card">
            <span className="label">Peak Output</span>
            <div className="val">
              <span className="spec-val" data-target="620" data-decimals="0">0</span>
              <span className="unit">kW</span>
            </div>
          </div>

          <div className="spec-metric-card">
            <span className="label">Target Range</span>
            <div className="val">
              <span className="spec-val" data-target="720" data-decimals="0">0</span>
              <span className="unit">km</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function var_color_text_dark_muted() {
  return '#626564'
}
