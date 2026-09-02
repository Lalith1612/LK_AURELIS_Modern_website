import { useState, useEffect } from 'react'
import ConfigureHeader from '../components/configurator/ConfigureHeader'
import ConfigurationProgress from '../components/configurator/ConfigurationProgress'
import VehicleStage from '../components/configurator/VehicleStage'
import FinishSelector from '../components/configurator/FinishSelector'
import WheelSelector from '../components/configurator/WheelSelector'
import InteriorSelector from '../components/configurator/InteriorSelector'
import DetailsSelector from '../components/configurator/DetailsSelector'
import SummaryStage from '../components/configurator/SummaryStage'
import EnquiryModal from '../components/configurator/EnquiryModal'
import VehicleSummary from '../components/configurator/VehicleSummary'
import ConfigurationFooter from '../components/configurator/ConfigurationFooter'
import { BASE_VEHICLE_PRICE, FINISHES, WHEELS, INTERIORS, DETAILS } from '../data/configuratorData'
import { generateConfigurationId, loadStoredConfiguration, saveConfiguration, clearStoredConfiguration } from '../utils/configurationStorage'
import { parseConfigurationUrl, cleanUrlSearchParams } from '../utils/configurationUrl'

export default function ConfigurePage({ onNavigate }) {
  const [configState, setConfigState] = useState(() => {
    // 1. Check if URL search parameters exist (URL WINS OVER LOCAL STORAGE)
    const urlConfig = parseConfigurationUrl(window.location.search, FINISHES, WHEELS, INTERIORS, DETAILS)
    if (urlConfig) {
      const sharedBuild = {
        id: generateConfigurationId(),
        stage: 5, // Open shared URL at Stage 05 SUMMARY for instant reveal
        exterior: urlConfig.exterior,
        wheel: urlConfig.wheel,
        interior: urlConfig.interior,
        detail: urlConfig.detail
      }
      saveConfiguration(sharedBuild)
      cleanUrlSearchParams()
      return sharedBuild
    }

    // 2. Check if valid local storage configuration exists
    const stored = loadStoredConfiguration(FINISHES, WHEELS, INTERIORS, DETAILS)
    if (stored) return stored

    // 3. Fallback to default configuration
    return {
      id: generateConfigurationId(),
      stage: 1,
      exterior: FINISHES[0],
      wheel: WHEELS[0],
      interior: INTERIORS[0],
      detail: DETAILS[0]
    }
  })

  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)

  // Persist state changes locally
  useEffect(() => {
    saveConfiguration(configState)
  }, [configState])

  // Preload all configurator assets on mount to prevent any stage transition flashes/flicker
  useEffect(() => {
    const imagesToPreload = [
      ...FINISHES.map(f => f.img),
      ...WHEELS.map(w => w.img),
      ...INTERIORS.map(i => i.img),
      ...DETAILS.map(d => d.img),
      '/assets/aurelis-hero.jpg'
    ]

    imagesToPreload.forEach(src => {
      if (src) {
        const img = new Image()
        img.src = src
      }
    })
  }, [])

  const optionsTotal =
    configState.exterior.price +
    configState.wheel.price +
    configState.interior.price +
    configState.detail.price

  const totalPrice = BASE_VEHICLE_PRICE + optionsTotal

  const setStage = (newStage) => {
    setConfigState(prev => ({ ...prev, stage: newStage }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const setExterior = (newExterior) => {
    setConfigState(prev => ({ ...prev, exterior: newExterior }))
  }

  const setWheel = (newWheel) => {
    setConfigState(prev => ({ ...prev, wheel: newWheel }))
  }

  const setInterior = (newInterior) => {
    setConfigState(prev => ({ ...prev, interior: newInterior }))
  }

  const setDetail = (newDetail) => {
    setConfigState(prev => ({ ...prev, detail: newDetail }))
  }

  const resetConfig = () => {
    clearStoredConfiguration()
    cleanUrlSearchParams()
    const newBuild = {
      id: generateConfigurationId(),
      stage: 1,
      exterior: FINISHES[0],
      wheel: WHEELS[0],
      interior: INTERIORS[0],
      detail: DETAILS[0]
    }
    setConfigState(newBuild)
    saveConfiguration(newBuild)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="configure-showroom-page">
      <ConfigureHeader onNavigate={onNavigate} />

      <main className="showroom-main-content container">
        <ConfigurationProgress
          currentStage={configState.stage}
          onSelectStage={setStage}
        />

        <div className="showroom-grid">
          <div className="showroom-left-col">
            <VehicleStage
              activeFinish={configState.exterior}
              activeWheel={configState.wheel}
              activeInterior={configState.interior}
              activeDetail={configState.detail}
              currentStage={configState.stage}
            />
          </div>

          <div className="showroom-right-col">
            {configState.stage === 1 && (
              <FinishSelector
                finishes={FINISHES}
                activeFinish={configState.exterior}
                onSelectFinish={setExterior}
              />
            )}

            {configState.stage === 2 && (
              <WheelSelector
                wheels={WHEELS}
                activeWheel={configState.wheel}
                onSelectWheel={setWheel}
              />
            )}

            {configState.stage === 3 && (
              <InteriorSelector
                interiors={INTERIORS}
                activeInterior={configState.interior}
                onSelectInterior={setInterior}
              />
            )}

            {configState.stage === 4 && (
              <DetailsSelector
                details={DETAILS}
                activeDetail={configState.detail}
                onSelectDetail={setDetail}
              />
            )}

            {configState.stage === 5 && (
              <SummaryStage
                configState={configState}
                basePrice={BASE_VEHICLE_PRICE}
                totalPrice={totalPrice}
                optionsTotal={optionsTotal}
                onEditStage={setStage}
                onRequestEnquiry={() => setIsEnquiryModalOpen(true)}
                onResetConfig={resetConfig}
              />
            )}

            <VehicleSummary
              activeFinish={configState.exterior}
              activeWheel={configState.wheel}
              activeInterior={configState.interior}
              activeDetail={configState.detail}
              totalPrice={totalPrice}
              basePrice={BASE_VEHICLE_PRICE}
            />
          </div>
        </div>
      </main>

      <ConfigurationFooter
        currentStage={configState.stage}
        onSetStage={setStage}
        onRequestEnquiry={() => setIsEnquiryModalOpen(true)}
      />

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        configState={configState}
        basePrice={BASE_VEHICLE_PRICE}
        totalPrice={totalPrice}
        optionsTotal={optionsTotal}
      />
    </div>
  )
}
