import { useEffect, useRef } from 'react'
import ConciergeHeader from './ConciergeHeader'
import ConciergeSuggestions from './ConciergeSuggestions'
import ConciergeMessageList from './ConciergeMessageList'
import ConciergeInput from './ConciergeInput'

export default function ConciergeDrawer({
  isOpen = false,
  onClose,
  messages = [],
  isPending = false,
  onSendMessage,
  onResetChat,
  onExecuteAction
}) {
  const drawerRef = useRef(null)

  // Escape key listener & focus management
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="concierge-drawer-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="presentation"
    >
      <aside
        ref={drawerRef}
        className="concierge-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="AURELIS Digital Concierge"
      >
        <ConciergeHeader onClose={onClose} onReset={onResetChat} />

        <div className="concierge-drawer-body">
          {messages.length <= 1 && (
            <ConciergeSuggestions
              onSelectSuggestion={(prompt) => onSendMessage(prompt)}
              isPending={isPending}
            />
          )}

          <ConciergeMessageList
            messages={messages}
            isPending={isPending}
            onExecuteAction={onExecuteAction}
          />
        </div>

        <footer className="concierge-drawer-footer">
          <ConciergeInput
            onSendMessage={onSendMessage}
            isPending={isPending}
            isOpen={isOpen}
          />
        </footer>
      </aside>
    </div>
  )
}
