export default function ConfigurationProgress({ currentStage = 1, onSelectStage }) {
  const steps = [
    { num: '01', id: 1, name: 'EXTERIOR', active: currentStage === 1, done: currentStage > 1 },
    { num: '02', id: 2, name: 'WHEELS', active: currentStage === 2, done: currentStage > 2 },
    { num: '03', id: 3, name: 'INTERIOR', active: currentStage === 3, done: currentStage > 3 },
    { num: '04', id: 4, name: 'DETAILS', active: currentStage === 4, done: currentStage > 4 },
    { num: '05', id: 5, name: 'SUMMARY', active: currentStage === 5, done: false }
  ]

  return (
    <div className="config-progress-bar">
      {steps.map(step => (
        <button
          key={step.num}
          type="button"
          disabled={!step.done && !step.active}
          onClick={() => {
            if (step.done || step.active) {
              onSelectStage(step.id)
            }
          }}
          className={`config-progress-step ${step.active ? 'is-active' : step.done ? 'is-done' : 'is-disabled'}`}
        >
          <span className="step-num">{step.num}</span>
          <span className="step-name">{step.name}</span>
          {step.done && <span className="step-badge-done">✓</span>}
          {step.active && <span className="step-badge-active">●</span>}
        </button>
      ))}
    </div>
  )
}
