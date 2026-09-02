import { formatCurrency } from '../../utils/formatters'

export default function FinishSelector({ finishes, activeFinish, onSelectFinish }) {
  return (
    <div className="finish-selector-panel">
      <div className="selector-header">
        <span className="selector-eyebrow">STEP 01</span>
        <h3 className="selector-title">EXTERIOR PAINT FINISH</h3>
        <p className="selector-desc">Select your bespoke exterior finish for the LK Aurelis.</p>
      </div>

      <div className="finish-swatch-list" role="radiogroup" aria-label="Exterior Finish Options">
        {finishes.map((finish) => {
          const isSelected = finish.id === activeFinish.id
          return (
            <button
              key={finish.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`finish-swatch-btn ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelectFinish(finish)}
            >
              <div className="swatch-indicator">
                <span
                  className="swatch-color"
                  style={{
                    background: finish.color,
                    border: finish.id === 'white' ? '1px solid #666' : '1px solid rgba(255,255,255,0.2)'
                  }}
                />
                {isSelected && <span className="swatch-active-ring" />}
              </div>

              <div className="swatch-label-box">
                <span className="swatch-name">{finish.name}</span>
                <span className="swatch-type">{finish.type}</span>
              </div>

              <span className="swatch-price">{formatCurrency(finish.price, true)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
