export default function AdasSection() {
  const adasFeatures = [
    { title: 'ADAPTIVE CRUISE CONTROL', desc: 'Maintains set distance and speed, with stop-and-go capability in heavy traffic.' },
    { title: 'LANE CENTERING ASSIST', desc: 'Provides gentle steering inputs to keep the vehicle centered in marked lanes.' },
    { title: 'COLLISION MITIGATION', desc: 'Autonomous emergency braking for vehicles, pedestrians, and cyclists.' },
    { title: 'BLIND SPOT MONITORING', desc: 'Active radar detection with steering intervention to prevent unsafe lane changes.' },
    { title: '360° SURROUND CAMERA', desc: '3D bird-eye view imaging with curb detection for effortless parking.' },
    { title: 'REAR CROSS-TRAFFIC ALERT', desc: 'Scans reversing path for oncoming traffic and applies brakes if needed.' }
  ]

  return (
    <section className="section-padding theme-dark">
      <div className="container">
        <span className="eyebrow-tag">Driver Assistance · 15</span>
        <h2 className="display-title">A SECOND LAYER OF AWARENESS.</h2>
        <p className="editorial-body" style={{ marginBottom: '48px' }}>
          Advanced driver assistance features designed to reduce driver fatigue and assist in critical situations. (Driver assistance systems remain auxiliary tools for the driver).
        </p>

        <div className="materials-grid">
          {adasFeatures.map(f => (
            <div key={f.title} className="gallery-card">
              <span className="gallery-card-badge">ADAS FEATURE</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
