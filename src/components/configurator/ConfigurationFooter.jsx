export default function ConfigurationFooter({ currentStage, onSetStage, onRequestEnquiry }) {
  return (
    <div className="config-footer-bar">
      <div className="container config-footer-inner">
        <div className="footer-status-text">
          <span className="gold-dot" />
          <span>
            {currentStage === 1 && 'STAGE 01 COMPLETE: EXTERIOR SPECIFIED'}
            {currentStage === 2 && 'STAGE 02 COMPLETE: WHEELS SPECIFIED'}
            {currentStage === 3 && 'STAGE 03 COMPLETE: INTERIOR SPECIFIED'}
            {currentStage === 4 && 'STAGE 04 COMPLETE: DETAILS SPECIFIED'}
            {currentStage === 5 && 'STAGE 05 COMPLETE: YOUR AURELIS SPECIFIED'}
          </span>
        </div>

        <div className="footer-actions" style={{ display: 'flex', gap: '16px' }}>
          {currentStage === 2 && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onSetStage(1)}
            >
              ← BACK TO EXTERIOR
            </button>
          )}

          {currentStage === 3 && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onSetStage(2)}
            >
              ← BACK TO WHEELS
            </button>
          )}

          {currentStage === 4 && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onSetStage(3)}
            >
              ← BACK TO INTERIOR
            </button>
          )}

          {currentStage === 5 && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onSetStage(4)}
            >
              ← BACK TO DETAILS
            </button>
          )}

          {currentStage === 1 && (
            <button
              type="button"
              className="btn btn-solid"
              onClick={() => onSetStage(2)}
            >
              CONTINUE TO WHEELS →
            </button>
          )}

          {currentStage === 2 && (
            <button
              type="button"
              className="btn btn-solid"
              onClick={() => onSetStage(3)}
            >
              CONTINUE TO INTERIOR →
            </button>
          )}

          {currentStage === 3 && (
            <button
              type="button"
              className="btn btn-solid"
              onClick={() => onSetStage(4)}
            >
              CONTINUE TO DETAILS →
            </button>
          )}

          {currentStage === 4 && (
            <button
              type="button"
              className="btn btn-solid"
              onClick={() => onSetStage(5)}
            >
              CONTINUE TO SUMMARY →
            </button>
          )}

          {currentStage === 5 && (
            <button
              type="button"
              className="btn btn-solid"
              onClick={onRequestEnquiry}
            >
              REQUEST AN ENQUIRY
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
