import { formatCurrency } from '../../utils/formatters'

export default function InteriorSelector({ interiors, activeInterior, onSelectInterior }) {
  return (
    <div className="finish-selector-panel">
      <div className="selector-header">
        <span className="selector-eyebrow">STEP 03</span>
        <h3 className="selector-title">CABIN SANCTUARY & THEME</h3>
        <p className="selector-desc">Select your interior cabin specification for the LK Aurelis.</p>
      </div>

      <div className="finish-swatch-list" role="radiogroup" aria-label="Interior Theme Options">
        {interiors.map((interior) => {
          const isSelected = interior.id === activeInterior.id
          return (
            <button
              key={interior.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`finish-swatch-btn ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelectInterior(interior)}
            >
              <div className="swatch-indicator">
                <span
                  className="swatch-color"
                  style={{
                    background: interior.color,
                    border: interior.id === 'ivory' ? '1px solid #666' : '1px solid rgba(255,255,255,0.2)'
                  }}
                />
                {isSelected && <span className="swatch-active-ring" />}
              </div>

              <div className="swatch-label-box">
                <span className="swatch-name">{interior.name}</span>
                <span className="swatch-type">{interior.desc}</span>
              </div>

              <span className="swatch-price">{formatCurrency(interior.price, true)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
