const DEFAULT_SUGGESTIONS = [
  'TELL ME ABOUT AURELIS',
  'EXPLORE PERFORMANCE',
  'WHAT DOES 800V MEAN?',
  'HELP ME CHOOSE AN INTERIOR',
  'COMPARE THE WHEELS',
  'STARTING PRICE & OPTIONS'
]

export default function ConciergeSuggestions({ onSelectSuggestion, isPending = false }) {
  return (
    <div className="concierge-suggestions-wrap">
      <span className="concierge-suggestions-label">CURATED TOPICS</span>
      <div className="concierge-suggestions-grid">
        {DEFAULT_SUGGESTIONS.map((topic, index) => (
          <button
            key={index}
            type="button"
            className="concierge-suggestion-chip"
            onClick={() => onSelectSuggestion(topic)}
            disabled={isPending}
          >
            <span className="chip-prefix">›</span>
            <span className="chip-text">{topic}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
