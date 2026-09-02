import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Hero({
  vehicleImg = '/assets/aurelis-hero.jpg',
  morphImg = '/assets/aurelis-finish-black.jpg',
  revealImg = '/assets/aurelis-hero.jpg',
  onNavigate
}) {
  const heroRef = useRef(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isCinematicActive, setIsCinematicActive] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.location.pathname === '/configure') return false
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !prefersReducedMotion
  })
  const timelineRef = useRef(null)

  // Skip cinematic intro directly into settled state
  const handleSkipIntro = () => {
    if (!isCinematicActive) return

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    const heroEl = heroRef.current
    if (!heroEl) {
      setIsCinematicActive(false)
      document.body.style.overflow = ''
      document.body.classList.remove('cinematic-active')
      return
    }

    const copyBox = heroEl.querySelector('.hero-copy-box')
    const mediaContainer = heroEl.querySelector('.hero-media-container')
    const tag = heroEl.querySelector('.hero-tag')
    const title = heroEl.querySelector('.hero-title')
    const tagline = heroEl.querySelector('.hero-tagline')
    const secondaryEls = heroEl.querySelectorAll('.hero-description, .hero-meta, .hero-actions, .hero-scroll-cue-inline')
    const backdrop = heroEl.querySelector('.hero-cinematic-backdrop')
    const shadowVeil = heroEl.querySelector('.hero-cinematic-shadow-veil')
    const softbox = heroEl.querySelector('.hero-cinematic-softbox')
    const skipBtn = heroEl.querySelector('.cinematic-skip-btn')
    const progressFill = heroEl.querySelector('.cinematic-progress-fill')
    const silverCar = heroEl.querySelector('.hero-car-silver')

    gsap.to([copyBox, mediaContainer, tag, title, tagline], {
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    })

    if (silverCar) gsap.to(silverCar, { opacity: 1, filter: 'none', duration: 0.4, ease: 'power2.out' })
    if (secondaryEls) gsap.to(secondaryEls, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
    if (backdrop) gsap.to(backdrop, { opacity: 0, duration: 0.4 })
    if (shadowVeil) gsap.to(shadowVeil, { opacity: 0, duration: 0.3 })
    if (softbox) gsap.to(softbox, { opacity: 0, duration: 0.3 })
    if (skipBtn) gsap.to(skipBtn, { opacity: 0, duration: 0.3 })
    if (progressFill) gsap.to(progressFill, { opacity: 0, duration: 0.3 })
    gsap.to('.navbar', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })

    setTimeout(() => {
      setIsCinematicActive(false)
      document.body.style.overflow = ''
      document.body.classList.remove('cinematic-active')
      gsap.set([copyBox, mediaContainer, tag, title, tagline, silverCar], {
        clearProps: 'transform,filter,textAlign'
      })
    }, 450)
  }

  // Unified First Light Cinematic Morph on Mount
  useEffect(() => {
    if (!isCinematicActive) {
      document.body.classList.remove('cinematic-active')
      return
    }

    document.body.classList.add('cinematic-active')
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    const heroEl = heroRef.current
    if (!heroEl) return

    const isDesktop = window.innerWidth >= 992
    const copyBox = heroEl.querySelector('.hero-copy-box')
    const mediaContainer = heroEl.querySelector('.hero-media-container')
    const tag = heroEl.querySelector('.hero-tag')
    const title = heroEl.querySelector('.hero-title')
    const tagline = heroEl.querySelector('.hero-tagline')
    const secondaryEls = heroEl.querySelectorAll('.hero-description, .hero-meta, .hero-actions, .hero-scroll-cue-inline')
    const backdrop = heroEl.querySelector('.hero-cinematic-backdrop')
    const shadowVeil = heroEl.querySelector('.hero-cinematic-shadow-veil')
    const softbox = heroEl.querySelector('.hero-cinematic-softbox')
    const skipBtn = heroEl.querySelector('.cinematic-skip-btn')
    const progressFill = heroEl.querySelector('.cinematic-progress-fill')
    const silverCar = heroEl.querySelector('.hero-car-silver')

    // Initial cinematic posture using canonical home page vehicle
    if (backdrop) gsap.set(backdrop, { opacity: 1 })
    if (shadowVeil) gsap.set(shadowVeil, { opacity: 0.95 })
    if (softbox) gsap.set(softbox, { xPercent: -130, opacity: 0 })
    if (skipBtn) gsap.set(skipBtn, { opacity: 0 })
    if (progressFill) gsap.set(progressFill, { width: '0%' })
    if (silverCar) {
      gsap.set(silverCar, {
        opacity: 0.45,
        filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.95)) brightness(0.65)'
      })
    }

    // Car container starts centered and expansive
    if (mediaContainer) {
      gsap.set(mediaContainer, {
        xPercent: isDesktop ? -28 : 0,
        yPercent: isDesktop ? -5 : -8,
        scale: isDesktop ? 1.25 : 1.15,
        transformOrigin: 'center center'
      })
    }

    // Typography starts centered below vehicle
    if (copyBox) {
      gsap.set(copyBox, {
        xPercent: isDesktop ? 44 : 0,
        yPercent: isDesktop ? 55 : 35,
        textAlign: 'center'
      })
    }
    if (tag) gsap.set(tag, { opacity: 0, y: 20 })
    if (title) gsap.set(title, { opacity: 0, y: 24 })
    if (tagline) gsap.set(tagline, { opacity: 0, y: 20 })

    const tl = gsap.timeline({
      onComplete: () => {
        setIsCinematicActive(false)
        document.body.style.overflow = ''
        document.body.classList.remove('cinematic-active')
        gsap.set([copyBox, mediaContainer, tag, title, tagline, silverCar], {
          clearProps: 'transform,filter,textAlign'
        })
      }
    })
    timelineRef.current = tl

    // Smooth Progress Line across 5.2s
    if (progressFill) {
      tl.to(progressFill, { width: '100%', duration: 5.2, ease: 'none' }, 0)
    }

    // Skip button gently fades in
    if (skipBtn) {
      tl.to(skipBtn, { opacity: 0.85, duration: 0.8, ease: 'power1.out' }, 0.4)
    }

    // 0.0s – 1.0s: Dark silhouette with faint outline of canonical Lunar Silver vehicle
    if (silverCar) {
      tl.to(
        silverCar,
        {
          opacity: 0.65,
          filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.95)) brightness(0.8)',
          duration: 1.2,
          ease: 'power1.inOut'
        },
        0
      )
    }

    // 1.0s – 2.5s: Studio softbox sweeps across front nose, illuminating LK Aurelis emblem & headlights
    if (softbox) {
      tl.to(softbox, { opacity: 0.95, duration: 0.4, ease: 'power2.out' }, 1.0)
      tl.to(softbox, { xPercent: 25, duration: 1.5, ease: 'power1.inOut' }, 1.0)
    }
    if (shadowVeil) {
      tl.to(shadowVeil, { opacity: 0.35, duration: 1.5, ease: 'power1.inOut' }, 1.0)
    }
    if (silverCar) {
      tl.to(
        silverCar,
        {
          opacity: 0.9,
          filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.95)) brightness(0.95)',
          duration: 1.5,
          ease: 'power2.out'
        },
        1.0
      )
    }

    // 2.5s – 3.8s: Light sweeps along side shoulder and forged wheels
    if (softbox) {
      tl.to(softbox, { xPercent: 130, duration: 1.6, ease: 'power2.inOut' }, 2.4)
    }
    if (shadowVeil) {
      tl.to(shadowVeil, { opacity: 0, duration: 1.2, ease: 'power2.out' }, 2.4)
    }
    if (silverCar) {
      tl.to(
        silverCar,
        {
          opacity: 1.0,
          filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.95)) brightness(1.0)',
          duration: 1.5,
          ease: 'power2.out'
        },
        2.4
      )
    }

    // 2.8s – 3.6s: Typography reveals in cinematic center posture
    if (tag) tl.to(tag, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 2.8)
    if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 2.9)
    if (tagline) tl.to(tagline, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 3.1)

    // 3.8s – 5.2s: THE SEAMLESS MORPH (Continuous, single vehicle, no crossfade!)
    // 1. Copy box glides from center to the left-hand hero column
    if (copyBox) {
      tl.to(
        copyBox,
        {
          xPercent: 0,
          yPercent: 0,
          duration: 1.4,
          ease: 'power3.inOut'
        },
        3.8
      )
    }

    // 2. Media container scales down & glides to the right-hand hero column
    if (mediaContainer) {
      tl.to(
        mediaContainer,
        {
          xPercent: 0,
          yPercent: 0,
          scale: 1.0,
          duration: 1.4,
          ease: 'power3.inOut'
        },
        3.8
      )
    }

    // 3. Softbox fades out
    if (softbox) {
      tl.to(softbox, { opacity: 0, duration: 0.6, ease: 'power1.out' }, 3.6)
    }

    // 4. Studio backdrop dissolves away revealing ambient hero gradient
    if (backdrop) {
      tl.to(backdrop, { opacity: 0, duration: 1.2, ease: 'power2.inOut' }, 4.0)
    }

    // 5. Skip button & progress bar fade out before morph completes
    if (skipBtn) tl.to(skipBtn, { opacity: 0, duration: 0.4, ease: 'power1.out' }, 3.9)
    if (progressFill) tl.to(progressFill, { opacity: 0, duration: 0.4, ease: 'power1.out' }, 4.2)

    // 6. Secondary hero UI & Navbar glide in seamlessly
    if (secondaryEls) {
      tl.to(
        secondaryEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.08
        },
        4.3
      )
    }
    tl.to('.navbar', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 4.4)

    // User interactions to bypass (Scroll or Keypress)
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
      document.body.classList.remove('cinematic-active')
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
    <section
      id="top"
      ref={heroRef}
      className={`hero-section ${isCinematicActive ? 'is-cinematic-active' : ''}`}
    >
      {/* Background Atmospheres */}
      <div className="hero-bg-atmosphere" />
      <div className="hero-stage-atmosphere-shift" />

      {/* First Light Studio Lighting & Shadow Layers */}
      {isCinematicActive && (
        <>
          <div className="hero-cinematic-backdrop" />
          <div className="hero-cinematic-shadow-veil" />
          <div className="hero-cinematic-softbox" />

          {/* Minimalist Skip Button */}
          <button
            type="button"
            className="cinematic-skip-btn"
            onClick={handleSkipIntro}
            aria-label="Skip opening cinematic"
          >
            <span>SKIP INTRO</span>
            <span className="skip-arrow">→</span>
          </button>

          {/* Progress Line */}
          <div className="cinematic-progress-bar">
            <div className="cinematic-progress-fill" />
          </div>
        </>
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
          {/* Canonical Lunar Silver Hero Vehicle (used for both cinematic intro & hero display) */}
          <img
            src={vehicleImg}
            alt="LK Aurelis Grand Touring Automobile"
            className="hero-car-silver"
            fetchPriority="high"
          />
          {/* Black Vehicle for Configure Morph */}
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

