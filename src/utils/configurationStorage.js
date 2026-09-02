const STORAGE_KEY = 'lk_aurelis_configuration'
const SCHEMA_VERSION = 1

export function generateConfigurationId() {
  const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ'
  const randomChunk = (len) => {
    let result = ''
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
  return `LK-AUR-${randomChunk(4)}-${randomChunk(2)}`
}

export function loadStoredConfiguration(finishes, wheels, interiors, details) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const data = JSON.parse(raw)
    if (!data || data.version !== SCHEMA_VERSION || !data.configuration) {
      return null
    }

    const cfg = data.configuration
    if (!cfg.id || typeof cfg.id !== 'string') return null

    const exterior = finishes.find(f => f.id === cfg.exteriorId)
    const wheel = wheels.find(w => w.id === cfg.wheelId)
    const interior = interiors.find(i => i.id === cfg.interiorId)
    const detail = details.find(d => d.id === cfg.detailId)

    if (!exterior || !wheel || !interior || !detail) {
      return null
    }

    const validStage = typeof cfg.stage === 'number' && cfg.stage >= 1 && cfg.stage <= 5 ? cfg.stage : 1

    return {
      id: cfg.id,
      stage: validStage,
      exterior,
      wheel,
      interior,
      detail
    }
  } catch (err) {
    console.warn('LK Aurelis: Stored configuration corrupt or inaccessible, using defaults.', err)
    return null
  }
}

export function saveConfiguration(configState) {
  try {
    if (!configState || !configState.id) return

    const payload = {
      version: SCHEMA_VERSION,
      configuration: {
        id: configState.id,
        stage: configState.stage,
        exteriorId: configState.exterior.id,
        wheelId: configState.wheel.id,
        interiorId: configState.interior.id,
        detailId: configState.detail.id,
        savedAt: new Date().toISOString()
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch (err) {
    console.warn('LK Aurelis: Failed to save configuration to local storage.', err)
  }
}

export function clearStoredConfiguration() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.warn('LK Aurelis: Failed to clear local storage.', err)
  }
}
