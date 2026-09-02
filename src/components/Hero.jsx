import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Hero({
  vehicleImg = '/assets/aurelis-hero.jpg',
  morphImg = '/assets/aurelis-finish-black.jpg',
  onNavigate
}) {
  const heroRef = useRef(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isCinematicDone, setIsCinematicDone] = useState(false)
  const cinematicTimelineRef = useRef(null)

  // Skip cinematic opening directly to settled state
  const handleSkipIntro = () => {
    if (isCinematicDone) return
    setIsCinematicDone(true)
    document.body.style.overflow = ''

    if (cinematicTimelineRef.current) {
      cinematicTimelineRef.current.kill()
    }

    const heroEl = heroRef.current
    if (!heroEl) return

    const car = heroEl.querySelector('.hero-car-silver')
    const title = heroEl.querySelector('.hero-title')
    const tag = heroEl.querySelector('.hero-tag')
    const tagline = heroEl.querySelector('.hero-tagline')
    const secondaryEls = heroEl.querySelectorAll('.hero-description, .hero-meta, .hero-actions, .hero-scroll-cue-inline')
    const backdrop = heroEl.querySelector('.hero-cinematic-backdrop')
    const skipBtn = heroEl.querySelector('.cinematic-skip-btn')
    const navbar = document.querySelector('.navbar')

    // Quick 0.5s settle
    gsap.to([car, title, tag, tagline], {
      x: 0,
      y: 0,
      scale: 1,
      xPercent: 0,
      yPercent: 0,
      opacity: 1,
      filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.9)) brightness(1)',
      duration: 0.5,
      ease: 'power2.out'
    })
    gsap.to(secondaryEls, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    if (backdrop) gsap.to(backdrop, { opacity: 0, duration: 0.5 })
    if (skipBtn) gsap.to(skipBtn, { opacity: 0, duration: 0.3 })
    if (navbar) gsap.to(navbar, { opacity: 1, y: 0, duration: 0.5 })
  }

  // Cinematic Opening on Mount
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      document.body.style.overflow = ''
      setIsCinematicDone(true)
      return
    }

    const heroEl = heroRef.current
    if (!heroEl) return

    const car = heroEl.querySelector('.hero-car-silver')
    const softbox = heroEl.querySelector('.hero-cinematic-softbox')
    const title = heroEl.querySelector('.hero-title')
    const tag = heroEl.querySelector('.hero-tag')
    const tagline = heroEl.querySelector('.hero-tagline')
    const secondaryEls = heroEl.querySelectorAll('.hero-description, .hero-meta, .hero-actions, .hero-scroll-cue-inline')
    const backdrop = heroEl.querySelector('.hero-cinematic-backdrop')
    const skipBtn = heroEl.querySelector('.cinematic-skip-btn')
    const navbar = document.querySelector('.navbar')

    // Initial cinematic states
    if (navbar) gsap.set(navbar, { opacity: 0, y: -20 })
    if (backdrop) gsap.set(backdrop, { opacity: 1 })
    if (skipBtn) gsap.set(skipBtn, { opacity: 0 })
    if (softbox) gsap.set(softbox, { xPercent: -130, opacity: 0 })

    // Car starts enlarged and shifted toward center
    if (car) {
      gsap.set(car, {
        scale: 1.2,
        xPercent: -10,
        yPercent: 3,
        opacity: 0.35,
        filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.95)) brightness(0.6)'
      })
    }

    // Main text starts in cinematic posture
    if (tag) gsap.set(tag, { opacity: 0, y: 15, x: -12 })
    if (title) gsap.set(title, { opacity: 0, y: 20, x: -15, scale: 1.12, transformOrigin: 'top left' })
    if (tagline) gsap.set(tagline, { opacity: 0, y: 20, x: -12 })
    if (secondaryEls) gsap.set(secondaryEls, { opacity: 0, y: 24 })

    const tl = gsap.timeline({
      onComplete: () => {
        setIsCinematicDone(true)
        document.body.style.overflow = ''
      }
    })
    cinematicTimelineRef.current = tl

    // Fade in skip button
    if (skipBtn) tl.to(skipBtn, { opacity: 0.8, duration: 0.8, ease: 'power1.out' }, 0.4)

    // 0.0s – 1.0s: Dark silhouette with faint logo and outline
    if (car) {
      tl.to(car, { opacity: 0.65, filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.95)) brightness(0.8)', duration: 1.2, ease: 'power1.inOut' }, 0)
    }

    // 1.0s – 2.5s: Studio softbox sweeps across front nose, illuminating LK Aurelis emblem & headlights
    if (softbox) {
      tl.to(softbox, { opacity: 0.95, duration: 0.3, ease: 'power2.out' }, 1.0)
      tl.to(softbox, { xPercent: 25, duration: 1.5, ease: 'power1.inOut' }, 1.0)
    }
    if (car) {
      tl.to(car, { opacity: 0.9, filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.95)) brightness(1.0)', duration: 1.5, ease: 'power2.out' }, 1.0)
    }

    // 2.5s – 3.8s: Light sweeps along side shoulder and alloy wheels
    if (softbox) {
      tl.to(softbox, { xPercent: 130, duration: 1.6, ease: 'power2.inOut' }, 2.4)
    }

    // 3.0s – 3.8s: Typography reveals with cinematic grandeur
    if (tag) tl.to(tag, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 2.8)
    if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 2.9)
    if (tagline) tl.to(tagline, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 3.1)

    // Softbox fades out
    if (softbox) tl.to(softbox, { opacity: 0, duration: 0.8, ease: 'power1.out' }, 3.6)

    // 4.0s – 5.4s: THE MORPH & SETTLE INTO HOMEPAGE
    // Letters move & scale down into exact home page position
    tl.to(
      [tag, title, tagline],
      {
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: 'power3.inOut'
      },
      4.0
    )

    // Car scales down & moves to its right-aligned home page position
    if (car) {
      tl.to(
        car,
        {
          scale: 1.0,
          xPercent: 0,
          yPercent: 0,
          opacity: 1.0,
          filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.9)) brightness(1)',
          duration: 1.4,
          ease: 'power3.inOut'
        },
        4.0
      )
    }

    // Secondary homepage UI (paragraph, actions, price) slide in
    if (secondaryEls) {
      tl.to(
        secondaryEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.08
        },
        4.4
      )
    }

    // Navbar drops into position
    if (navbar) {
      tl.to(
        navbar,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        },
        4.4
      )
    }

    // Cinematic backdrop dissolves away
    if (backdrop) {
      tl.to(backdrop, { opacity: 0, duration: 1.2, ease: 'power2.inOut' }, 4.1)
    }

    // Skip button fades out
    if (skipBtn) {
      tl.to(skipBtn, { opacity: 0, duration: 0.4, ease: 'power1.out' }, 4.0)
    }

    // Event listeners to bypass opening
    const handleKey = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSkipIntro()
      }
    }

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 25) {
        handleSkipIntro()
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

  // Transition to /configure on CTA click
  const handleConfigureClick = (e) => {
    e.preventDefault()
    if (isTransitioning) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      if (onNavigate) onNavigate('/configure', { fromHero: true })
      return
    }

    setIsTransitioning(true)

    const heroEl = heroRef.current
    if (!heroEl) {
      if (onNavigate) onNavigate('/configure', { fromHero: true })
      return
    }

    const actions = heroEl.querySelector('.hero-actions')
    const textEls = heroEl.querySelectorAll('.hero-tag, .hero-title, .hero-tagline, .hero-description, .hero-meta, .hero-scroll-cue-inline')
    const mediaContainer = heroEl.querySelector('.hero-media-container')
    const silverCar = heroEl.querySelector('.hero-car-silver')
    const blackCar = heroEl.querySelector('.hero-car-black')
    const lightFlare = heroEl.querySelector('.hero-light-flare')
    const bgAtmosphere = heroEl.querySelector('.hero-bg-atmosphere')
    const shiftAtmosphere = heroEl.querySelector('.hero-stage-atmosphere-shift')

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(
          [actions, textEls, mediaContainer, silverCar, blackCar, lightFlare, bgAtmosphere, shiftAtmosphere],
          { clearProps: 'all' }
        )
        setIsTransitioning(false)
      }
    })

    if (actions) {
      tl.to(actions, { opacity: 0, duration: 0.2, ease: 'power2.out' }, 0)
    }

    if (textEls.length > 0) {
      tl.to(textEls, { y: -50, opacity: 0, duration: 0.6, ease: 'power3.out' }, 0)
    }

    if (mediaContainer) {
      tl.to(mediaContainer, { scale: 1.05, duration: 0.85, ease: 'power2.out' }, 0)
    }
    if (bgAtmosphere) {
      tl.to(bgAtmosphere, { scale: 1.03, duration: 0.85, ease: 'power2.out' }, 0)
    }

    if (lightFlare) {
      tl.fromTo(
        lightFlare,
        { left: '-30%', opacity: 0 },
        { left: '130%', opacity: 1, duration: 0.75, ease: 'power2.inOut' },
        0.2
      )
      tl.to(lightFlare, { opacity: 0, duration: 0.2, ease: 'power1.out' }, 0.75)
    }

    if (silverCar && blackCar) {
      tl.to(silverCar, { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 0.35)
      tl.to(blackCar, { opacity: 1, duration: 0.45, ease: 'power1.inOut' }, 0.35)
    }

    if (bgAtmosphere && shiftAtmosphere) {
      tl.to(bgAtmosphere, { opacity: 0, duration: 0.65, ease: 'power2.inOut' }, 0.25)
      tl.to(shiftAtmosphere, { opacity: 1, duration: 0.65, ease: 'power2.inOut' }, 0.25)
    }

    tl.add(() => {
      if (onNavigate) onNavigate('/configure', { fromHero: true })
      window.scrollTo(0, 0)
    }, 0.95)
  }

  return (
    <section id="top" ref={heroRef} className="hero-section">
      {/* Background Atmospheres */}
      <div className="hero-bg-atmosphere" />
      <div className="hero-stage-atmosphere-shift" />
      <div className="hero-cinematic-backdrop" />

      {/* Dynamic Moving Softbox Studio Light Source */}
      <div className="hero-cinematic-softbox" />

      {/* Minimalist Skip Button */}
      {!isCinematicDone && (
        <button
          type="button"
          className="cinematic-skip-btn"
          onClick={handleSkipIntro}
          aria-label="Skip opening cinematic"
        >
          <span>SKIP INTRO</span>
          <span className="skip-arrow">→</span>
        </button>
      )}

      <div className="container hero-grid">
        <div className="hero-copy-box">
          <span className="hero-tag">LK AURELIS · 2026</span>
          <h1 className="hero-title">AURELIS</h1>
          <p className="hero-tagline">The road, redefined.</p>
          
          <p className="hero-description">
            An uncompromising grand touring electric automobile engineered around silence, presence, and effortless performance.
          </p>

          <div className="hero-meta">
            <strong>Starting from $185,000</strong>
          </div>

          <div className="hero-actions" style={{ marginBottom: '40px' }}>
            <a
              href="/configure"
              onClick={handleConfigureClick}
              className="btn btn-solid"
              aria-busy={isTransitioning}
            >
              Configure Your Aurelis
            </a>
            <a href="#design" className="btn btn-outline">
              Explore The Design
            </a>
          </div>

          <a
            className="hero-scroll-cue-inline"
            href="#intro"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)'
            }}
          >
            <span style={{ width: '32px', height: '1px', background: 'var(--color-accent-gold)' }} /> Scroll to reveal
          </a>
        </div>

        <div className="hero-media-container">
          <div className="hero-light-flare" />
          <img
            src={vehicleImg}
            alt="LK Aurelis Grand Touring Automobile"
            className="hero-car-silver"
            fetchPriority="high"
          />
          <img
            src={morphImg}
            alt="LK Aurelis Obsidian Black"
            className="hero-car-black"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
