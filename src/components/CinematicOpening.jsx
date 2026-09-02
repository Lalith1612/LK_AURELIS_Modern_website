import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CinematicOpening({ onComplete }) {
  const containerRef = useRef(null)
  const [isDismissing, setIsDismissing] = useState(false)
  const timelineRef = useRef(null)
  const hasCompletedRef = useRef(false)

  const triggerComplete = () => {
    if (hasCompletedRef.current) return
    hasCompletedRef.current = true
    document.body.style.overflow = ''
    if (onComplete) {
      onComplete()
    }
  }

  const handleSkip = () => {
    if (isDismissing || hasCompletedRef.current) return
    setIsDismissing(true)

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: triggerComplete
      })
    } else {
      triggerComplete()
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
      triggerComplete()
      return
    }

    const container = containerRef.current
    if (!container) return

    const carWrapper = container.querySelector('.cinematic-car-wrapper')
    const carImg = container.querySelector('.cinematic-car-img')
    const shadowVeil = container.querySelector('.cinematic-shadow-veil')
    const softbox = container.querySelector('.cinematic-softbox-sweep')
    const typography = container.querySelector('.cinematic-title-box')
    const skipBtn = container.querySelector('.cinematic-skip-btn')
    const progressFill = container.querySelector('.cinematic-progress-fill')

    // Initial states
    gsap.set(container, { opacity: 1, visibility: 'visible' })
    if (carWrapper) gsap.set(carWrapper, { scale: 1.05 })
    if (carImg) gsap.set(carImg, { opacity: 0.25 })
    if (shadowVeil) gsap.set(shadowVeil, { opacity: 0.95 })
    if (softbox) gsap.set(softbox, { xPercent: -120, opacity: 0 })
    if (typography) gsap.set(typography, { opacity: 0, y: 24 })
    if (skipBtn) gsap.set(skipBtn, { opacity: 0 })
    if (progressFill) gsap.set(progressFill, { width: '0%' })

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDismissing(true)
        gsap.to(container, {
          opacity: 0,
          duration: 0.9,
          ease: 'power2.inOut',
          onComplete: triggerComplete
        })
      }
    })
    timelineRef.current = tl

    // Smooth Progress Line across 5.5s
    if (progressFill) {
      tl.to(progressFill, { width: '100%', duration: 5.5, ease: 'none' }, 0)
    }

    // Fade in skip button gently
    if (skipBtn) {
      tl.to(skipBtn, { opacity: 0.85, duration: 0.8, ease: 'power1.out' }, 0.4)
    }

    // 0.0s – 5.5s: Subtle Camera Push-in
    if (carWrapper) {
      tl.to(carWrapper, { scale: 1.0, duration: 5.5, ease: 'power1.out' }, 0)
    }

    // 0.0s – 1.0s: Near darkness / restrained silhouette
    if (carImg) {
      tl.to(carImg, { opacity: 0.5, duration: 1.2, ease: 'power1.inOut' }, 0)
    }

    // 1.0s – 2.5s: Softbox sweeps across front quarter & DRLs emerge
    if (softbox) {
      tl.to(softbox, { opacity: 0.95, duration: 0.4, ease: 'power2.out' }, 1.0)
      tl.to(softbox, { xPercent: 25, duration: 1.5, ease: 'power1.inOut' }, 1.0)
    }
    if (shadowVeil) {
      tl.to(shadowVeil, { opacity: 0.35, duration: 1.5, ease: 'power1.inOut' }, 1.0)
    }
    if (carImg) {
      tl.to(carImg, { opacity: 0.85, duration: 1.5, ease: 'power2.out' }, 1.0)
    }

    // 2.5s – 4.0s: Light sweeps along side shoulder, glasshouse, and forged wheels
    if (softbox) {
      tl.to(softbox, { xPercent: 130, duration: 1.8, ease: 'power2.inOut' }, 2.5)
    }
    if (shadowVeil) {
      tl.to(shadowVeil, { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 2.5)
    }
    if (carImg) {
      tl.to(carImg, { opacity: 1.0, duration: 1.6, ease: 'power2.out' }, 2.5)
    }

    // 3.0s – 3.8s: Editorial Typography Reveal in center ("AURELIS / The road, redefined.")
    if (typography) {
      tl.to(typography, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 3.0)
    }

    // 3.8s – 5.4s: THE SEAMLESS MORPH INTO HOMEPAGE HERO
    // 1. Text moves smoothly to the left/hero position and scales to fit
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 992
    if (typography) {
      tl.to(
        typography,
        {
          xPercent: isDesktop ? -38 : 0,
          yPercent: isDesktop ? -55 : -70,
          scale: 0.92,
          duration: 1.5,
          ease: 'power3.inOut'
        },
        3.8
      )
    }

    // 2. Car image reduces in size and shifts to the right/hero media position
    if (carWrapper) {
      tl.to(
        carWrapper,
        {
          xPercent: isDesktop ? 18 : 0,
          yPercent: isDesktop ? 0 : 15,
          scale: isDesktop ? 0.82 : 0.88,
          duration: 1.5,
          ease: 'power3.inOut'
        },
        3.8
      )
    }

    // 3. Softbox & shadow veil complete fadeout
    if (softbox) {
      tl.to(softbox, { opacity: 0, duration: 0.6, ease: 'power1.out' }, 3.6)
    }
    if (shadowVeil) {
      tl.to(shadowVeil, { opacity: 0, duration: 0.8, ease: 'power2.out' }, 3.6)
    }

    // 4. Progress bar & skip button fade out smoothly before morph ends
    if (skipBtn) {
      tl.to(skipBtn, { opacity: 0, duration: 0.4, ease: 'power1.out' }, 3.8)
    }
    if (progressFill) {
      tl.to(progressFill, { opacity: 0, duration: 0.4, ease: 'power1.out' }, 4.2)
    }

    // 5. Studio backdrop seamlessly crossfades to reveal the live homepage
    tl.to(
      container,
      {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      },
      4.2
    )

    // Settle pause before unmount
    tl.to({}, { duration: 0.4 })

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
      {/* Studio Background & Vehicle Layer */}
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

