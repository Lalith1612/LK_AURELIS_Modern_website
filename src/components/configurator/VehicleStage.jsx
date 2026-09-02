export default function VehicleStage({ activeFinish, activeWheel, activeInterior, activeDetail, currentStage }) {
  let displayImg = activeFinish.img
  let displayTitle = activeFinish.name
  let displayEyebrow = 'STAGE 01 · EXTERIOR PAINT'

  if (currentStage === 2) {
    displayImg = activeWheel.img
    displayTitle = `${activeFinish.name} · ${activeWheel.name}`
    displayEyebrow = 'STAGE 02 · WHEEL SPECIFICATION'
  } else if (currentStage === 3) {
    displayImg = activeInterior.img
    displayTitle = `CABIN SANCTUARY · ${activeInterior.name}`
    displayEyebrow = 'STAGE 03 · INTERIOR THEME'
  } else if (currentStage === 4) {
    displayImg = activeDetail.img
    displayTitle = `TRIM DETAILING · ${activeDetail.name}`
    displayEyebrow = 'STAGE 04 · DETAIL PACKAGE'
  } else if (currentStage === 5) {
    displayImg = activeWheel.img
    displayTitle = `YOUR LK AURELIS BUILD`
    displayEyebrow = 'STAGE 05 · FINAL SPECIFICATION OVERVIEW'
  }

  return (
    <div className="vehicle-stage-container">
      <div className="stage-bg-atmosphere" />
      <div className="vehicle-stage-media">
        <img
          key={displayImg}
          src={displayImg}
          alt={`LK Aurelis ${displayTitle}`}
          className="vehicle-stage-img is-active"
        />
      </div>

      <div className="stage-overlay-info">
        <span className="stage-eyebrow">{displayEyebrow}</span>
        <h2 className="stage-finish-title">{displayTitle}</h2>
      </div>
    </div>
  )
}
