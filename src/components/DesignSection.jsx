export default function DesignSection({ designImg }) {
  const imgSrc = designImg || '/assets/aurelis-design-detail.jpg'

  return (
    <section id="design" className="section-padding theme-dark">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow-tag">Design · 02</span>
            <h2 className="display-title">
              DESIGNED<br />WITHOUT<br />COMPROMISE.
            </h2>
            <p className="section-subtitle">Purity in every line.</p>
            <p className="editorial-body">
              AURELIS is defined by athletic proportions and minimal surface ornamentation. The long-wheelbase stance, flush door handles, and continuous glass canopy deliver low aerodynamic drag while maintaining a commanding road presence.
            </p>
          </div>

          <div>
            <div className="gallery-card" style={{ padding: '0', background: 'none', border: 'none', overflow: 'hidden', borderRadius: '4px' }}>
              <img
                src={imgSrc}
                alt="Aurelis Exterior Design Silhouette Detail"
                loading="lazy"
                style={{ width: '100%', borderRadius: '4px', border: '1px solid var(--color-border-dark)', transition: 'transform 0.5s ease' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
