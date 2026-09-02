import { useState, useRef, useEffect } from 'react'

export default function ConciergeInput({ onSendMessage, isPending = false, isOpen = false }) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    if (!trimmed || isPending) return

    onSendMessage(trimmed)
    setInputValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form className="concierge-input-form" onSubmit={handleSubmit}>
      <div className="concierge-input-container">
        <input
          ref={inputRef}
          type="text"
          className="concierge-text-field"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ASK ABOUT AURELIS..."
          disabled={isPending}
          maxLength={600}
          aria-label="Ask about LK Aurelis"
        />
        <button
          type="submit"
          className="concierge-submit-btn"
          disabled={!inputValue.trim() || isPending}
          aria-label="Send message"
        >
          <span className="submit-arrow">→</span>
        </button>
      </div>
      <div className="concierge-input-meta">
        <span>Grounded in LK AURELIS Concept Data</span>
        <span className="key-hint">Press Enter ↵</span>
      </div>
    </form>
  )
}
