export default function SectionIntro({ filmVideo }) {
  return (
    <section id="intro" className="intro-section section-padding theme-deep">
      <div className="container">
        <div className="intro-grid">
          <div>
            <span className="eyebrow-tag">The Grand Tourer · 01</span>
            <h2 className="display-title">AURELIS</h2>
            <p className="section-subtitle">Precision, given form.</p>
          </div>
          <div>
            <p className="editorial-body">
              AURELIS represents the pinnacle of modern electric grand touring. Shaped by proportion, light, and acoustic restraint, every line serves a structural and aerodynamic purpose.
            </p>
          </div>
        </div>

        <div className="media-banner" style={{ marginTop: '64px' }}>
          <video
            src={filmVideo}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            aria-label="LK Aurelis Cinematic Film"
          />
        </div>
      </div>
    </section>
  )
}
