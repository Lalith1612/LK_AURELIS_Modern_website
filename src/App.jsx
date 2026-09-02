import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SectionIntro from './components/SectionIntro'
import DesignSection from './components/DesignSection'
import ExteriorGallery from './components/ExteriorGallery'
import PerformanceSection from './components/PerformanceSection'
import PerformanceDetail from './components/PerformanceDetail'
import EngineeringSection from './components/EngineeringSection'
import ElectricArchitecture from './components/ElectricArchitecture'
import BatteryCharging from './components/BatteryCharging'
import InteriorExperience from './components/InteriorExperience'
import MaterialsGallery from './components/MaterialsGallery'
import TechnologySection from './components/TechnologySection'
import ConnectedExperience from './components/ConnectedExperience'
import AudioSection from './components/AudioSection'
import SafetySection from './components/SafetySection'
import AdasSection from './components/AdasSection'
import ComfortConvenience from './components/ComfortConvenience'
import Personalization from './components/Personalization'
import SpecificationSheet from './components/SpecificationSheet'
import ReviewsSection from './components/ReviewsSection'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import HomepageEnquiryModal from './components/HomepageEnquiryModal'

import ConfigurePage from './pages/ConfigurePage'
import ConciergeTrigger from './components/concierge/ConciergeTrigger'
import ConciergeDrawer from './components/concierge/ConciergeDrawer'
import { useConcierge } from './hooks/useConcierge'
import { executeConciergeAction } from './data/conciergeActions'

gsap.registerPlugin(ScrollTrigger)

const ASSETS = {
  vehicle: '/assets/aurelis-hero.jpg',
  designDetail: '/assets/aurelis-design-detail.jpg',
  film: '/assets/video/aurelis-motion.mp4',
  interior: '/assets/aurelis-interior.jpg',
  charging: '/assets/aurelis-charging-official.jpg',
  chassis: '/assets/aurelis-chassis.jpg',
  techCockpit: '/assets/aurelis-tech-cockpit.jpg',
  connectApp: '/assets/aurelis-connect-app.jpg',
  safetyCell: '/assets/aurelis-safety-cell.jpg',
  gallery: {
    front: '/assets/aurelis-ext-front.jpg',
    profile: '/assets/aurelis-ext-profile.jpg',
    rear: '/assets/aurelis-ext-rear.jpg',
    aero: '/assets/aurelis-ext-aero.jpg'
  },
  materials: {
    nordico: '/assets/aurelis-mat-nordico.jpg',
    ash: '/assets/aurelis-mat-ash.jpg',
    aluminium: '/assets/aurelis-mat-aluminium.jpg'
  },
  finishes: {
    black: '/assets/aurelis-finish-black.jpg',
    silver: '/assets/aurelis-finish-silver.jpg',
    grey: '/assets/aurelis-finish-grey.jpg',
    white: '/assets/aurelis-finish-white.jpg'
  },
  engImages: {
    aero: '/assets/aurelis-eng-aero.jpg',
    suspension: '/assets/aurelis-eng-suspension.jpg',
    braking: '/assets/aurelis-eng-braking.jpg'
  }
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname)
  const [isHomepageEnquiryOpen, setIsHomepageEnquiryOpen] = useState(false)
  const [isConciergeTriggerVisible, setIsConciergeTriggerVisible] = useState(true)

  const navigate = (toPath) => {
    window.history.pushState({}, '', toPath)
    setCurrentPath(toPath)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const {
    isOpen: isConciergeOpen,
    isPending: isConciergePending,
    messages: conciergeMessages,
    toggleConcierge,
    closeConcierge,
    sendMessage: sendConciergeMsg,
    resetChat: resetConciergeChat,
    triggerRef: conciergeTriggerRef
  } = useConcierge({
    currentSection: currentPath === '/configure' ? 'configure' : 'home'
  })

  const handleExecuteConciergeAction = (action) => {
    executeConciergeAction(action, {
      onNavigate: navigate,
      onOpenEnquiry: () => setIsHomepageEnquiryOpen(true),
      onCloseDrawer: closeConcierge
    })
  }

  useEffect(() => {
    if (currentPath === '/configure') return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Dynamic specs count-up animation
      gsap.utils.toArray('.spec-val').forEach(el => {
        const target = parseFloat(el.getAttribute('data-target'))
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10)
        const obj = { value: 0 }

        gsap.to(obj, {
          value: target,
          duration: 2.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            el.innerText = obj.value.toFixed(decimals)
          }
        })
      })

      // Section titles and editorial text entrance
      gsap.utils.toArray('.display-title, .section-subtitle, .editorial-body').forEach(el => {
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true
          }
        })
      })

      // Media banners subtle image reveal
      gsap.utils.toArray('.media-banner img').forEach(el => {
        gsap.from(el, {
          opacity: 0,
          scale: 1.015,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        })
      })

      // Cards staggered entrance
      gsap.utils.toArray('.gallery-card, .material-card, .spec-category-box, .review-card, .spec-metric-card').forEach(el => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        })
      })
    }, document.body)

    return () => ctx.revert()
  }, [currentPath])

  if (currentPath === '/configure') {
    return (
      <>
        <ConfigurePage onNavigate={navigate} />
        <ConciergeTrigger
          ref={conciergeTriggerRef}
          onClick={toggleConcierge}
          isOpen={isConciergeOpen}
          isVisible={isConciergeTriggerVisible}
        />
        <ConciergeDrawer
          isOpen={isConciergeOpen}
          onClose={closeConcierge}
          messages={conciergeMessages}
          isPending={isConciergePending}
          onSendMessage={sendConciergeMsg}
          onResetChat={resetConciergeChat}
          onExecuteAction={handleExecuteConciergeAction}
        />
      </>
    )
  }

  return (
    <>
      <Navbar onNavigate={navigate} />
      <main>
        <Hero vehicleImg={ASSETS.vehicle} onNavigate={navigate} />
        <SectionIntro filmVideo={ASSETS.film} />
        <DesignSection designImg={ASSETS.designDetail} />
        <ExteriorGallery galleryImages={ASSETS.gallery} />
        <PerformanceSection />
        <PerformanceDetail />
        <EngineeringSection engImages={ASSETS.engImages} />
        <ElectricArchitecture chassisImg={ASSETS.chassis} />
        <BatteryCharging chargingImg={ASSETS.charging} />
        <InteriorExperience interiorImg={ASSETS.interior} />
        <MaterialsGallery materialImages={ASSETS.materials} />
        <TechnologySection techImg={ASSETS.techCockpit} />
        <ConnectedExperience appImg={ASSETS.connectApp} />
        <AudioSection />
        <SafetySection safetyImg={ASSETS.safetyCell} />
        <AdasSection />
        <ComfortConvenience />
        <Personalization finishImages={ASSETS.finishes} />
        <SpecificationSheet />
        <ReviewsSection />
        <FinalCTA onNavigate={navigate} onRequestEnquiry={() => setIsHomepageEnquiryOpen(true)} />
      </main>
      <Footer onRequestEnquiry={() => setIsHomepageEnquiryOpen(true)} />
      <HomepageEnquiryModal
        isOpen={isHomepageEnquiryOpen}
        onClose={() => setIsHomepageEnquiryOpen(false)}
      />

      {/* Global AURELIS Digital Concierge */}
      <ConciergeTrigger
        ref={conciergeTriggerRef}
        onClick={toggleConcierge}
        isOpen={isConciergeOpen}
        isVisible={isConciergeTriggerVisible}
      />
      <ConciergeDrawer
        isOpen={isConciergeOpen}
        onClose={closeConcierge}
        messages={conciergeMessages}
        isPending={isConciergePending}
        onSendMessage={sendConciergeMsg}
        onResetChat={resetConciergeChat}
        onExecuteAction={handleExecuteConciergeAction}
      />
    </>
  )
}
