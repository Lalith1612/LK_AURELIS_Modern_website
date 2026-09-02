import { useState } from 'react'

export default function Personalization({ finishImages }) {
  const [selectedFinish, setSelectedFinish] = useState('black')

  const finishes = [
    {
      id: 'black',
      name: 'OBSIDIAN BLACK',
      desc: 'Deep metallic obsidian finish with stealth dark chrome accents.',
      img: finishImages?.black || '/assets/aurelis-finish-black.jpg'
    },
    {
      id: 'silver',
      name: 'LUNAR SILVER',
      desc: 'High-brightness liquid silver metallic finish with warm light reflections.',
      img: finishImages?.silver || '/assets/aurelis-finish-silver.jpg'
    },
    {
      id: 'grey',
      name: 'TITANIUM GREY',
      desc: 'Technical dark titanium grey satin finish with graphite highlights.',
      img: finishImages?.grey || '/assets/aurelis-finish-grey.jpg'
    },
    {
      id: 'white',
      name: 'AURELIS WHITE',
      desc: 'Multi-coat pearl white finish with luminous depth.',
      img: finishImages?.white || '/assets/aurelis-finish-white.jpg'
    }
  ]

  const activeFinishObj = finishes.find(f => f.id === selectedFinish) || finishes[0]

  return (
    <section id="personalize" className="section-padding theme-dark">
      <div className="container">
        <span className="eyebrow-tag">08 · EXTERIOR FINISHES</span>
        <h2 className="display-title" style={{ fontSize: 'clamp(42px, 6vw, 90px)' }}>CHOOSE YOUR EXPRESSION.</h2>
        <p className="section-subtitle" style={{ marginBottom: '32px' }}>Four curated finishes. Each with its own character.</p>

        {/* Featured Stage Preview */}
        <div style={{ width: '100%', height: 'min(45vw, 480px)', borderRadius: '4px', overflow: 'hidden', marginBottom: '32px', border: '1px solid var(--color-border-dark)' }}>
          <img
            src={activeFinishObj.img}
            alt={`LK Aurelis in ${activeFinishObj.name}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }}
          />
        </div>

        {/* 4 Exterior Finish Cards */}
        <div className="design-gallery-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5vw' }}>
          {finishes.map(f => {
            const isSelected = selectedFinish === f.id
            return (
              <div
                key={f.id}
                className="gallery-card"
                onClick={() => setSelectedFinish(f.id)}
                style={{
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--color-accent-gold)' : 'var(--color-border-dark)',
                  background: isSelected ? 'rgba(213, 196, 171, 0.06)' : 'var(--color-bg-card)',
                  padding: '16px',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ width: '100%', height: '140px', overflow: 'hidden', borderRadius: '2px', marginBottom: '16px' }}>
                  <img
                    src={f.img}
                    alt={`LK Aurelis in ${f.name}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                  />
                </div>
                <h4 style={{ fontSize: '13px', letterSpacing: '0.15em', fontFamily: 'var(--font-mono)', color: isSelected ? 'var(--color-accent-gold)' : 'var(--color-text-white)', margin: 0 }}>
                  {f.name}
                </h4>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
