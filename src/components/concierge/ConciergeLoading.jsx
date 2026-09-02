export default function ConciergeLoading() {
  return (
    <div className="concierge-message-item is-model is-loading" role="status" aria-live="polite">
      <div className="message-role-tag">AURELIS CONCIERGE</div>
      <div className="concierge-loading-box">
        <span className="loading-status-text">REFLECTING</span>
        <div className="loading-shimmer-bar">
          <div className="shimmer-indicator" />
        </div>
      </div>
    </div>
  )
}
