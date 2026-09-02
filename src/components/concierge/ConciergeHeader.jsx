export default function ConciergeHeader({ onClose, onReset }) {
  return (
    <header className="concierge-panel-header">
      <div className="concierge-header-brand">
        <span className="concierge-brand-eyebrow">DIGITAL CONCIERGE</span>
        <h2 className="concierge-brand-title">LK AURELIS</h2>
        <p className="concierge-brand-desc">Your guide to the AURELIS grand touring concept.</p>
      </div>

      <div className="concierge-header-controls">
        <button
          type="button"
          className="concierge-ctrl-btn"
          onClick={onReset}
          title="Restart Consultation"
          aria-label="Restart conversation with concierge"
        >
          <span className="ctrl-icon">↺</span>
        </button>
        <button
          type="button"
          className="concierge-ctrl-btn close-btn"
          onClick={onClose}
          title="Close Concierge"
          aria-label="Close AURELIS digital concierge"
        >
          <span className="ctrl-icon">✕</span>
        </button>
      </div>
    </header>
  )
}
