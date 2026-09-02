import { useEffect, useRef } from 'react'
import ConciergeActions from './ConciergeActions'
import ConciergeLoading from './ConciergeLoading'

export default function ConciergeMessageList({
  messages = [],
  isPending = false,
  onExecuteAction
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages.length, isPending])

  return (
    <div
      ref={containerRef}
      className="concierge-message-stream"
      role="log"
      aria-live="polite"
      tabIndex={0}
    >
      {messages.map((msg) => {
        const isUser = msg.role === 'user'

        if (!isUser && msg.isStreaming && !msg.content) {
          return <ConciergeLoading key={msg.id} />
        }

        return (
          <article
            key={msg.id}
            className={`concierge-message-item ${isUser ? 'is-user' : 'is-model'}`}
          >
            <div className="message-role-tag">
              {isUser ? 'YOU' : 'AURELIS CONCIERGE'}
            </div>

            <div className="message-text-content">
              {msg.content.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
              {msg.isStreaming && <span className="stream-cursor" aria-hidden="true" />}
            </div>

            {!isUser && !msg.isStreaming && msg.actions && msg.actions.length > 0 && (
              <ConciergeActions
                actions={msg.actions}
                onExecuteAction={onExecuteAction}
              />
            )}
          </article>
        )
      })}
    </div>
  )
}
