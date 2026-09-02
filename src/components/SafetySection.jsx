import { useState, useEffect, useRef } from 'react'

const HOTSPOTS = [
  {
    id: 'b-pillar',
    title: 'B-PILLAR REINFORCEMENT',
    subtitle: 'BORON STEEL PASSENGER CELL',
    desc: 'High-strength structural reinforcement designed to strengthen the passenger cell and resist high-energy side-impact intrusion.',
    x: '48%',
    y: '34%'
  },
  {
    id: 'battery-pack',
    title: 'INTEGRATED BATTERY PACK',
    subtitle: 'ALUMINUM SAFETY HOUSING',
    desc: 'The battery pack is integrated into the vehicle\'s structural architecture, protected by extruded aluminum multi-cell crash channels.',
    x: '52%',
    y: '72%'
  },
  {
    id: 'crash-structure',
    title: 'CRASH-RESISTANT STRUCTURE',
    subtitle: 'CABIN ARCHITECTURE',
    desc: 'Structural architecture designed around occupant protection, structural load paths, and controlled energy management.',
    x: '28%',
    y: '42%'
  },
  {
    id: 'energy-absorption',
    title: 'ENERGY ABSORPTION ZONES',
    subtitle: 'DEFORMATION CHANNELS',
    desc: 'Dedicated structural areas designed to manage and disperse crash energy away from occupants during collision.',
    x: '78%',
    y: '52%'
  }
]

export default function SafetySection({ safetyImg }) {
  const imgSrc = safetyImg || '/assets/aurelis-safety-cell.jpg'
  const [activeHotspot, setActiveHotspot] = useState(null)
  const stageRef = useRef(null)

  const safetyFeatures = [
    { title: 'ULTRA-HIGH STRENGTH STEEL', desc: 'Passenger cell reinforced with hot-formed boron steel pillar structures.' },
    { title: 'BATTERY SAFETY CAGE', desc: 'Extruded aluminum side sills absorb side impacts to protect high-voltage cells.' },
    { title: '11 AIRBAG PROTECTION', desc: 'Includes driver knee airbag, central interaction airbag, and full curtain airbags.' },
    { title: 'ELECTRONIC STABILITY V4', desc: 'Predictive stability control prevents loss of traction before wheel slip occurs.' }
  ]

  // Close on Escape or outside click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveHotspot(null)
    }

    const handleClickOutside = (e) => {
      if (stageRef.current && !stageRef.current.contains(e.target)) {
        setActiveHotspot(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <section id="safety" className="section-padding theme-deep">
      <div className="container">
        <span className="eyebrow-tag">Safety · 14</span>
        <h2 className="display-title">UNCOMPROMISING PROTECTION.</h2>
        <p className="editorial-body" style={{ marginBottom: '32px' }}>
          Safety is integrated into every structural member. High-strength aluminum-steel hybrid body design combined with intelligent active protection.
        </p>

        {/* Interactive Technical Visualization */}
        <div className="safety-stage-wrapper" ref={stageRef}>
          <div className="media-banner safety-media-banner">
            <img src={imgSrc} alt="LK Aurelis Structural Safety Cage Architecture" loading="lazy" />

            {/* Hotspot Markers */}
            {HOTSPOTS.map((spot) => {
              const isActive = activeHotspot?.id === spot.id
              return (
                <div
                  key={spot.id}
                  className={`safety-hotspot ${isActive ? 'is-active' : ''}`}
                  style={{ top: spot.y, left: spot.x }}
                >
                  <button
                    type="button"
                    className="hotspot-trigger"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveHotspot(isActive ? null : spot)
                    }}
                    aria-label={`Inspect ${spot.title}`}
                    aria-expanded={isActive}
                  >
                    <span className="hotspot-pulse" />
                    <span className="hotspot-point" />
                  </button>

                  {isActive && (
                    <div
                      className="hotspot-annotation-card"
                      onClick={(e) => e.stopPropagation()}
                      role="region"
                      aria-label={spot.title}
                    >
                      <div className="hotspot-card-header">
                        <span className="hotspot-badge">{spot.subtitle}</span>
                        <button
                          type="button"
                          className="hotspot-close-btn"
                          onClick={() => setActiveHotspot(null)}
                          aria-label="Close annotation"
                        >
                          ×
                        </button>
                      </div>
                      <h4 className="hotspot-title">{spot.title}</h4>
                      <p className="hotspot-desc">{spot.desc}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="safety-explore-cue">
            <span className="gold-dot" />
            <span>EXPLORE THE STRUCTURE · SELECT HOTSPOTS TO INSPECT KEY ENGINEERING REINFORCEMENTS</span>
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: '40px' }}>
          {safetyFeatures.map(sf => (
            <div key={sf.title} className="gallery-card">
              <span className="gallery-card-badge">SAFETY SYSTEM</span>
              <h4>{sf.title}</h4>
              <p>{sf.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
