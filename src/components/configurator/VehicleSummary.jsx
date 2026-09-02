import { formatCurrency } from '../../utils/formatters'

export default function VehicleSummary({ activeFinish, activeWheel, activeInterior, activeDetail, totalPrice, basePrice }) {
  const specs = [
    { label: 'DRIVETRAIN', val: 'Dual-Motor AWD' },
    { label: 'PEAK POWER', val: '620 kW' },
    { label: 'WLTP RANGE', val: '720 km' },
    { label: '0–100 KM/H', val: '3.4 s' }
  ]

  const isConfigured = totalPrice > basePrice

  return (
    <div className="vehicle-summary-card">
      <div className="summary-price-box">
        <span className="price-label">
          {isConfigured ? 'SPECIFICATION TOTAL' : 'STARTING FROM'}
        </span>
        <h3 className="price-value">{formatCurrency(totalPrice)}</h3>
      </div>

      <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--color-border-dark)', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-accent-gold)', letterSpacing: '0.15em' }}>EXTERIOR PAINT</span>
          <div style={{ textAlign: 'right' }}>
            <strong style={{ fontSize: '12px', color: 'var(--color-text-white)', display: 'block' }}>{activeFinish.name}</strong>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-muted)' }}>{formatCurrency(activeFinish.price, true)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-accent-gold)', letterSpacing: '0.15em' }}>WHEEL PACKAGE</span>
          <div style={{ textAlign: 'right' }}>
            <strong style={{ fontSize: '12px', color: 'var(--color-text-white)', display: 'block' }}>{activeWheel.name} {activeWheel.size}</strong>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-muted)' }}>{formatCurrency(activeWheel.price, true)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-accent-gold)', letterSpacing: '0.15em' }}>INTERIOR THEME</span>
          <div style={{ textAlign: 'right' }}>
            <strong style={{ fontSize: '12px', color: 'var(--color-text-white)', display: 'block' }}>{activeInterior.name}</strong>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-muted)' }}>{formatCurrency(activeInterior.price, true)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-accent-gold)', letterSpacing: '0.15em' }}>DETAIL PACKAGE</span>
          <div style={{ textAlign: 'right' }}>
            <strong style={{ fontSize: '12px', color: 'var(--color-text-white)', display: 'block' }}>{activeDetail.name}</strong>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-muted)' }}>{formatCurrency(activeDetail.price, true)}</span>
          </div>
        </div>
      </div>

      <div className="summary-specs-grid">
        {specs.map(s => (
          <div key={s.label} className="summary-spec-item">
            <span className="spec-item-label">{s.label}</span>
            <strong className="spec-item-val">{s.val}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
