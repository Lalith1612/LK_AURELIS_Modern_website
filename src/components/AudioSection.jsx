export default function AudioSection() {
  return (
    <section className="section-padding theme-dark">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow-tag">Audio Architecture · 13</span>
            <h2 className="display-title">A PRIVATE CONCERT HALL.</h2>
            <p className="section-subtitle">22-Speaker Spatial Sound Engine</p>
            <p className="editorial-body">
              Engineered with 22 individually amped speakers including headrest speakers and subwoofers embedded into the structural floor. Tuned specifically to match the low acoustic noise floor of the electric cabin.
            </p>
          </div>

          <div className="grid-2">
            <div className="gallery-card">
              <span className="gallery-card-badge">SPEAKER ZONES</span>
              <h4>3D Spatial Sound</h4>
              <p>Independent sound stage processing for front and rear cabin occupants.</p>
            </div>
            <div className="gallery-card">
              <span className="gallery-card-badge">POWER</span>
              <h4>1,200W Amplifier</h4>
              <p>Class-D high efficiency digital signal processor with active distortion control.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
