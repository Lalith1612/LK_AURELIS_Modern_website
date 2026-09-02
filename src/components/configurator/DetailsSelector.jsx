import { formatCurrency } from '../../utils/formatters'

export default function DetailsSelector({ details, activeDetail, onSelectDetail }) {
  return (
    <div className="finish-selector-panel">
      <div className="selector-header">
        <span className="selector-eyebrow">STEP 04</span>
        <h3 className="selector-title">TRIM & DETAIL PACKAGE</h3>
        <p className="selector-desc">Select your visual detailing specification for the LK Aurelis.</p>
      </div>

      <div className="finish-swatch-list" role="radiogroup" aria-label="Detail Package Options">
        {details.map((detail) => {
          const isSelected = detail.id === activeDetail.id
          return (
            <button
              key={detail.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`finish-swatch-btn ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelectDetail(detail)}
            >
              <div className="swatch-indicator">
                <span
                  className="swatch-color"
                  style={{
                    background: detail.color,
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                />
                {isSelected && <span className="swatch-active-ring" />}
              </div>

              <div className="swatch-label-box">
                <span className="swatch-name">{detail.name}</span>
                <span className="swatch-type">{detail.desc}</span>
              </div>

              <span className="swatch-price">{formatCurrency(detail.price, true)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
