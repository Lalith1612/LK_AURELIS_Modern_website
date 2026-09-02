import { FINISHES, WHEELS, INTERIORS, DETAILS } from './configuratorData.js'

/**
 * Whitelist of valid section targets on the LK AURELIS website
 */
export const VALID_SECTION_TARGETS = {
  top: '#top',
  intro: '#intro',
  design: '#design',
  gallery: '#gallery',
  performance: '#performance',
  dynamics: '#dynamics',
  engineering: '#engineering',
  architecture: '#architecture',
  charging: '#charging',
  interior: '#interior',
  materials: '#materials',
  technology: '#technology',
  connected: '#connected',
  audio: '#audio',
  safety: '#safety',
  adas: '#adas',
  comfort: '#comfort',
  personalization: '#personalization',
  specifications: '#specifications',
  reviews: '#reviews',
  enquiry: '#enquiry'
}

/**
 * Validates and normalizes configuration options against canonical data
 */
export function validateConfigurationOptions(options = {}) {
  if (!options || typeof options !== 'object') {
    return {
      exterior: FINISHES[0].id,
      wheels: WHEELS[0].id,
      interior: INTERIORS[0].id,
      details: DETAILS[0].id
    }
  }

  const validExterior = FINISHES.find(f => f.id === options.exterior)?.id || FINISHES[0].id
  const validWheels = WHEELS.find(w => w.id === options.wheels)?.id || WHEELS[0].id
  const validInterior = INTERIORS.find(i => i.id === options.interior)?.id || INTERIORS[0].id
  const validDetails = DETAILS.find(d => d.id === options.details)?.id || DETAILS[0].id

  return {
    exterior: validExterior,
    wheels: validWheels,
    interior: validInterior,
    details: validDetails
  }
}

/**
 * Builds a deterministic configurator deep-link URL
 */
export function buildConfiguratorUrl(options = {}) {
  const validated = validateConfigurationOptions(options)
  const params = new URLSearchParams()
  params.set('exterior', validated.exterior)
  params.set('wheels', validated.wheels)
  params.set('interior', validated.interior)
  params.set('details', validated.details)
  return `/configure?${params.toString()}`
}

/**
 * Dispatches a client-side action securely
 */
export function executeConciergeAction(action, { onNavigate, onOpenEnquiry, onCloseDrawer }) {
  if (!action || !action.type) return

  switch (action.type) {
    case 'navigate': {
      const target = action.target
      if (target === 'configure') {
        if (onCloseDrawer) onCloseDrawer()
        if (onNavigate) onNavigate('/configure')
        return
      }

      if (VALID_SECTION_TARGETS[target]) {
        if (onCloseDrawer) onCloseDrawer()
        if (window.location.pathname !== '/') {
          if (onNavigate) onNavigate('/')
          setTimeout(() => {
            const el = document.querySelector(VALID_SECTION_TARGETS[target])
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }, 350)
        } else {
          const el = document.querySelector(VALID_SECTION_TARGETS[target])
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }
      }
      break
    }

    case 'build_configuration': {
      const configUrl = buildConfiguratorUrl(action.target)
      if (onCloseDrawer) onCloseDrawer()
      if (onNavigate) {
        onNavigate(configUrl)
      } else {
        window.location.href = configUrl
      }
      break
    }

    case 'request_enquiry': {
      if (onCloseDrawer) onCloseDrawer()
      if (onOpenEnquiry) onOpenEnquiry()
      break
    }

    default:
      console.warn('AURELIS Concierge: Unrecognized action type:', action.type)
  }
}
