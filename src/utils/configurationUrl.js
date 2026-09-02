export function createConfigurationUrl(configState) {
  if (!configState) return window.location.href

  try {
    const url = new URL('/configure', window.location.origin)
    
    if (configState.exterior?.id) {
      url.searchParams.set('exterior', configState.exterior.id)
    }
    if (configState.wheel?.id) {
      url.searchParams.set('wheels', configState.wheel.id)
    }
    if (configState.interior?.id) {
      url.searchParams.set('interior', configState.interior.id)
    }
    if (configState.detail?.id) {
      url.searchParams.set('details', configState.detail.id)
    }

    return url.toString()
  } catch (err) {
    console.warn('LK Aurelis: Unable to generate share URL.', err)
    return window.location.href
  }
}

export function parseConfigurationUrl(searchStr, finishes, wheels, interiors, details) {
  if (!searchStr || typeof searchStr !== 'string') return null

  try {
    const params = new URLSearchParams(searchStr)
    const exteriorParam = params.get('exterior')
    const wheelParam = params.get('wheels')
    const interiorParam = params.get('interior')
    const detailParam = params.get('details')

    // If no configurator search params exist, return null
    if (!exteriorParam && !wheelParam && !interiorParam && !detailParam) {
      return null
    }

    // Resolve parameter against canonical options, falling back to defaults if invalid or partial
    const exterior = finishes.find(f => f.id === exteriorParam) || finishes[0]
    const wheel = wheels.find(w => w.id === wheelParam) || wheels[0]
    const interior = interiors.find(i => i.id === interiorParam) || interiors[0]
    const detail = details.find(d => d.id === detailParam) || details[0]

    return {
      exterior,
      wheel,
      interior,
      detail,
      hasUrlParams: true
    }
  } catch (err) {
    console.warn('LK Aurelis: Failed to parse URL parameters, using fallbacks.', err)
    return null
  }
}

export function cleanUrlSearchParams() {
  try {
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, '', window.location.pathname)
    }
  } catch (err) {
    console.warn('LK Aurelis: Unable to clean URL search parameters.', err)
  }
}
