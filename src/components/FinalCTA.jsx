export default function FinalCTA({ onNavigate, onRequestEnquiry }) {
  return (
    <section className="cta-section theme-deep">
      <div className="container cta-box">
        <span className="eyebrow-tag">LK AURELIS · 2026</span>
        <h2 className="display-title" style={{ fontSize: 'clamp(52px, 8vw, 110px)' }}>THE ROAD IS YOURS.</h2>
        <p className="section-subtitle" style={{ marginBottom: '32px' }}>AURELIS. The road, redefined.</p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/configure"
            onClick={(e) => {
              e.preventDefault()
              if (onNavigate) onNavigate('/configure')
            }}
            className="btn btn-solid"
          >
            Configure Your Aurelis
          </a>
          <a href="#design" className="btn btn-outline">
            Explore The Vehicle
          </a>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              if (onRequestEnquiry) onRequestEnquiry()
            }}
            className="btn btn-outline"
          >
            Request An Enquiry
          </button>
        </div>
      </div>
    </section>
  )
}
