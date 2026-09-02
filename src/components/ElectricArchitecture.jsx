export default function ElectricArchitecture({ chassisImg }) {
  return (
    <section id="architecture" className="section-padding theme-dark">
      <div className="container">
        <span className="eyebrow-tag">Platform · 07</span>
        <h2 className="display-title">AURELIS ELECTRIC ARCHITECTURE</h2>
        <p className="section-subtitle">Dedicated 800V High-Voltage Skateboard Platform</p>
        <p className="editorial-body">
          Built from the ground up on the proprietary AURELIS 800-volt skateboard platform. By embedding the ultra-dense battery module low in the chassis, AURELIS achieves an exceptionally low center of gravity and 50:50 weight balance.
        </p>

        <div className="media-banner">
          <img src={chassisImg} alt="Aurelis 800V Electric Skateboard Chassis Architecture" />
        </div>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2vw', marginTop: '40px' }}>
          <div className="gallery-card">
            <span className="gallery-card-badge">01 · VOLTAGE</span>
            <h4>800V Architecture</h4>
            <p>High efficiency, reduced wiring weight, and consistent high-power thermal handling.</p>
          </div>
          <div className="gallery-card">
            <span className="gallery-card-badge">02 · BALANCE</span>
            <h4>50:50 Mass Distribution</h4>
            <p>Neutral cornering dynamics and sharp turn-in response on mountain roads.</p>
          </div>
          <div className="gallery-card">
            <span className="gallery-card-badge">03 · RIGIDITY</span>
            <h4>Torsional Stiffness</h4>
            <p>Extruded aluminum structural frame with integrated battery casing increases body rigidity by 42%.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
