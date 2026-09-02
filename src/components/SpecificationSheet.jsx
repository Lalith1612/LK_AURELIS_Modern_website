export default function SpecificationSheet() {
  const specCategories = [
    {
      title: 'PERFORMANCE',
      rows: [
        { label: '0–100 km/h Acceleration', val: '3.4 s (Concept Target)' },
        { label: 'Peak Drivetrain Output', val: '620 kW (831 hp)' },
        { label: 'Top Track Speed', val: '260 km/h (Electronically Limited)' },
        { label: 'Drive Configuration', val: 'Dual-Motor All-Wheel Drive' }
      ]
    },
    {
      title: 'ELECTRIC SYSTEM & RANGE',
      rows: [
        { label: 'Target WLTP Range', val: '720 km' },
        { label: 'System Voltage Architecture', val: '800-Volt DC Platform' },
        { label: '10–80% Fast DC Charge Time', val: '18 minutes (300 kW Charger)' },
        { label: 'AC Home Charging Rate', val: '22 kW Three-Phase' }
      ]
    },
    {
      title: 'DIMENSIONS & WEIGHT',
      rows: [
        { label: 'Overall Length', val: '4,980 mm' },
        { label: 'Overall Width (Mirrors Out)', val: '2,140 mm' },
        { label: 'Overall Height', val: '1,410 mm' },
        { label: 'Wheelbase', val: '3,020 mm' }
      ]
    },
    {
      title: 'CHASSIS & BRAKES',
      rows: [
        { label: 'Suspension Type', val: 'Adaptive Triple-Chamber Air Springs' },
        { label: 'Front Brake System', val: '420mm Carbon-Ceramic 10-Piston Calipers' },
        { label: 'Rear Brake System', val: '380mm Carbon-Ceramic 4-Piston Calipers' },
        { label: 'Wheel Specification', val: '22-inch Forged Alloy (F: 265/35, R: 305/30)' }
      ]
    }
  ]

  return (
    <section className="section-padding theme-deep">
      <div className="container">
        <span className="eyebrow-tag">Full Specifications · 18</span>
        <h2 className="display-title">TECHNICAL DATA.</h2>
        <p className="editorial-body">
          Detailed concept parameters for the LK AURELIS Grand Tourer platform. All specifications are subject to final homologation.
        </p>

        <div className="spec-sheet-grid">
          {specCategories.map(cat => (
            <div key={cat.title} className="spec-category-box">
              <h3>{cat.title}</h3>
              {cat.rows.map(r => (
                <div key={r.label} className="spec-row">
                  <span>{r.label}</span>
                  <strong>{r.val}</strong>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
