import { forwardRef } from 'react'

const ConciergeTrigger = forwardRef(function ConciergeTrigger(
  { onClick, isOpen = false, isVisible = true },
  ref
) {
  if (!isVisible) return null

  return (
    <button
      ref={ref}
      type="button"
      className={`concierge-floating-trigger ${isOpen ? 'is-active' : ''}`}
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-label="Open AURELIS Digital Concierge"
      id="concierge-trigger-btn"
    >
      <span className="trigger-dot" aria-hidden="true" />
      <span className="trigger-label">CONCIERGE</span>
      <span className="trigger-symbol" aria-hidden="true">
        {isOpen ? '✕' : '+'}
      </span>
    </button>
  )
})

export default ConciergeTrigger
