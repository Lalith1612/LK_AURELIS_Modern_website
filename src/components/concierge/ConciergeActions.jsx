export default function ConciergeActions({ actions = [], onExecuteAction }) {
  if (!Array.isArray(actions) || actions.length === 0) return null

  return (
    <div className="concierge-actions-cluster">
      {actions.map((action, idx) => (
        <button
          key={idx}
          type="button"
          className="concierge-action-btn"
          onClick={() => onExecuteAction(action)}
        >
          <span className="action-label">{action.label || 'EXPLORE'}</span>
          <span className="action-arrow">→</span>
        </button>
      ))}
    </div>
  )
}
