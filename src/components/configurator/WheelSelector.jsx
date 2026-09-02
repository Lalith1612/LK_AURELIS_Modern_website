import { formatCurrency } from '../../utils/formatters'

export default function WheelSelector({ wheels, activeWheel, onSelectWheel }) {
  return (
    <div className="finish-selector-panel">
      <div className="selector-header">
        <span className="selector-eyebrow">STEP 02</span>
        <h3 className="selector-title">WHEEL DESIGN & SPECIFICATION</h3>
        <p className="selector-desc">Select your wheel specification for the LK Aurelis.</p>
      </div>

      <div className="finish-swatch-list" role="radiogroup" aria-label="Wheel Design Options">
        {wheels.map((wheel) => {
          const isSelected = wheel.id === activeWheel.id
          return (
            <button
              key={wheel.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`finish-swatch-btn ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelectWheel(wheel)}
            >
              <div className="swatch-indicator">
                <span
                  className="swatch-color"
                  style={{
                    background: isSelected ? 'var(--color-accent-gold)' : 'rgba(255,255,255,0.15)'
                  }}
                />
                {isSelected && <span className="swatch-active-ring" />}
              </div>

              <div className="swatch-label-box">
                <span className="swatch-name">
                  {wheel.name} <span style={{ color: 'var(--color-accent-gold)', marginLeft: '6px' }}>{wheel.size}</span>
                </span>
                <span className="swatch-type">{wheel.desc}</span>
              </div>

              <span className="swatch-price">{formatCurrency(wheel.price, true)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
