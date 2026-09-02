import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CinematicOpening({ onComplete }) {
  const containerRef = useRef(null)
  const [isDismissing, setIsDismissing] = useState(false)
  const timelineRef = useRef(null)

  const handleSkip = () => {
    if (isDismissing) return
    setIsDismissing(true)
    document.body.style.overflow = ''

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          if (onComplete) onComplete()
        }
      })
    } else {
      if (onComplete) onComplete()
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      document.body.style.overflow = ''
      if (onComplete) onComplete()
      return
    }

    const container = containerRef.current
    if (!container) return

    const carImg = container.querySelector('.cinematic-car-img')
    const shadowVeil = container.querySelector('.cinematic-shadow-veil')
    const softbox = container.querySelector('.cinematic-softbox-sweep')
    const typography = container.querySelector('.cinematic-title-box')
    const skipBtn = container.querySelector('.cinematic-skip-btn')

    // Initial states
    gsap.set(container, { opacity: 1, visibility: 'visible' })
    gsap.set(carImg, { scale: 1.03, opacity: 0.35 })
    gsap.set(shadowVeil, { opacity: 0.95 })
    gsap.set(softbox, { xPercent: -120, opacity: 0 })
    gsap.set(typography, { opacity: 0, y: 20 })
    gsap.set(skipBtn, { opacity: 0 })

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDismissing(true)
        document.body.style.overflow = ''
        gsap.to(container, {
          opacity: 0,
          duration: 1.0,
          ease: 'power2.inOut',
          onComplete: () => {
            if (onComplete) onComplete()
          }
        })
      }
    })
    timelineRef.current = tl

    // Fade in skip button gently
    tl.to(skipBtn, { opacity: 0.8, duration: 0.8, ease: 'power1.out' }, 0.4)

    // 0.0s – 1.0s: Darkness with faint silhouette
    tl.to(carImg, { opacity: 0.55, duration: 1.0, ease: 'power1.inOut' }, 0)

    // 1.0s – 2.5s: Softbox sweeps across front quarter, revealing LK Aurelis emblem and hood contours
    tl.to(softbox, { opacity: 0.95, duration: 0.3, ease: 'power2.out' }, 1.0)
    tl.to(softbox, { xPercent: 25, duration: 1.5, ease: 'power1.inOut' }, 1.0)
    tl.to(shadowVeil, { opacity: 0.35, duration: 1.5, ease: 'power1.inOut' }, 1.0)
    tl.to(carImg, { scale: 1.015, opacity: 0.9, duration: 1.8, ease: 'power2.out' }, 1.0)

    // 2.5s – 4.0s: Light travels along side shoulder line, glasshouse, and wheels
    tl.to(softbox, { xPercent: 130, duration: 1.8, ease: 'power2.inOut' }, 2.5)
    tl.to(shadowVeil, { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 2.5)
    tl.to(carImg, { scale: 1.0, opacity: 1.0, duration: 1.8, ease: 'power2.out' }, 2.5)

    // 4.0s – 5.0s: Softbox settles into quiet studio ambiance
    tl.to(softbox, { opacity: 0, duration: 0.8, ease: 'power1.out' }, 3.8)

    // 5.0s – 6.0s: Pure React/CSS Typography Reveal
    tl.to(typography, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 4.6)

    // Settle pause before seamless dissolve
    tl.to({}, { duration: 0.8 })

    // User interactions to bypass (Scroll or Keypress)
    const handleKey = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSkip()
      }
    }

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 25) {
        handleSkip()
      }
    }

    window.addEventListener('keydown', handleKey)
    window.addEventListener('wheel', handleWheel, { passive: true })

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('wheel', handleWheel)
      if (tl) tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="cinematic-opening-container">
      {/* Studio Background & Vehicle Layer with the exact SAME approved vehicle asset */}
      <div className="cinematic-stage">
        <div className="cinematic-car-wrapper">
          <img
            src="/assets/aurelis-hero.jpg"
            alt="LK Aurelis Grand Tourer 'The First Light' Studio Reveal"
            className="cinematic-car-img"
            fetchPriority="high"
          />
          {/* Shadow Veil for progressive illumination */}
          <div className="cinematic-shadow-veil" />

          {/* Dynamic Moving Softbox Studio Light Source */}
          <div className="cinematic-softbox-sweep" />

          {/* Floor Shadow / Atmosphere Depth */}
          <div className="cinematic-floor-gradient" />
        </div>
      </div>

      {/* Layered Editorial Typography */}
      <div className="cinematic-title-box">
        <span className="cinematic-eyebrow">LK AURELIS · 2026</span>
        <h1 className="cinematic-title">AURELIS</h1>
        <p className="cinematic-tagline">The road, redefined.</p>
      </div>

      {/* Minimalist Skip Button */}
      <button
        type="button"
        className="cinematic-skip-btn"
        onClick={handleSkip}
        aria-label="Skip opening cinematic"
      >
        <span>SKIP INTRO</span>
        <span className="skip-arrow">→</span>
      </button>

      {/* Progress Line */}
      <div className="cinematic-progress-bar">
        <div className="cinematic-progress-fill" />
      </div>
    </div>
  )
}
