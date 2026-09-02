import { useState } from 'react'
import { formatCurrency } from '../../utils/formatters'
import { createConfigurationUrl } from '../../utils/configurationUrl'

export default function SummaryStage({ configState, basePrice, totalPrice, optionsTotal, onEditStage, onRequestEnquiry, onResetConfig }) {
  const [showCopyNotice, setShowCopyNotice] = useState(false)
  const [showManualCopy, setShowManualCopy] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [pdfErrorNotice, setPdfErrorNotice] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    if (isSharing) return
    setIsSharing(true)
    try {
      const url = createConfigurationUrl(configState)
      setShareUrl(url)

      if (navigator.share) {
        try {
          await navigator.share({
            title: 'My LK AURELIS',
            text: 'Explore my LK AURELIS configuration.',
            url
          })
          return
        } catch (err) {
          if (err.name === 'AbortError') return
        }
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(url)
          setShowCopyNotice(true)
          setTimeout(() => setShowCopyNotice(false), 2500)
          return
        } catch (err) {
          console.warn('Clipboard API unavailable, fallback to manual copy.', err)
        }
      }

      setShowManualCopy(true)
    } finally {
      setIsSharing(false)
    }
  }

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true)
    setPdfErrorNotice(false)
    try {
      const { generateSpecificationPdf } = await import('../../utils/pdfGenerator')
      await generateSpecificationPdf(configState, basePrice, totalPrice, optionsTotal)
    } catch (err) {
      console.error('PDF generation error:', err)
      setPdfErrorNotice(true)
      setTimeout(() => setPdfErrorNotice(false), 3000)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const items = [
    {
      stageId: 1,
      num: '01',
      label: 'EXTERIOR PAINT',
      val: configState.exterior.name,
      sub: configState.exterior.type,
      price: configState.exterior.price,
      img: configState.exterior.img
    },
    {
      stageId: 2,
      num: '02',
      label: 'WHEEL PACKAGE',
      val: `${configState.wheel.name} ${configState.wheel.size}`,
      sub: configState.wheel.desc,
      price: configState.wheel.price,
      img: configState.wheel.img
    },
    {
      stageId: 3,
      num: '03',
      label: 'INTERIOR THEME',
      val: configState.interior.name,
      sub: configState.interior.desc,
      price: configState.interior.price,
      img: configState.interior.img
    },
    {
      stageId: 4,
      num: '04',
      label: 'DETAIL PACKAGE',
      val: configState.detail.name,
      sub: configState.detail.desc,
      price: configState.detail.price,
      img: configState.detail.img
    }
  ]

  return (
    <div className="finish-selector-panel summary-stage-panel">
      <div className="selector-header" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="selector-eyebrow">STEP 05 · FINAL SPECIFICATION OVERVIEW</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent-gold)', letterSpacing: '0.15em' }}>
            ID: {configState.id}
          </span>
        </div>
        <h3 className="selector-title" style={{ fontSize: '22px', letterSpacing: '0.12em', color: 'var(--color-text-white)', marginTop: '6px' }}>
          YOUR AURELIS
        </h3>
        <p className="selector-desc" style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>
          Review your bespoke grand touring automobile specification below.
        </p>
      </div>

      <div className="summary-breakdown-list">
        {items.map(item => (
          <div key={item.num} className="summary-breakdown-card">
            <div className="summary-card-thumb">
              <img src={item.img} alt={item.val} />
            </div>

            <div className="summary-card-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="summary-card-num">{item.num} {item.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-accent-gold)' }}>
                  {formatCurrency(item.price, true)}
                </span>
              </div>
              <strong className="summary-card-val">{item.val}</strong>
            </div>

            <button
              type="button"
              className="summary-edit-btn"
              onClick={() => onEditStage(item.stageId)}
              aria-label={`Edit ${item.label}`}
            >
              EDIT
            </button>
          </div>
        ))}
      </div>

      {/* Specification Plaque Pricing & Reference Summary */}
      <div className="specification-plaque-box" style={{
        marginTop: '20px',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--color-border-dark)',
        borderRadius: '4px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-muted)' }}>BASE VEHICLE SPECIFICATION</span>
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-white)' }}>{formatCurrency(basePrice)}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-muted)' }}>SELECTED OPTIONAL EQUIPMENT</span>
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent-gold)' }}>{formatCurrency(optionsTotal, true)}</strong>
        </div>

        <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent-gold)', letterSpacing: '0.15em', display: 'block' }}>CONFIGURATION TOTAL</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-muted)' }}>REF: {configState.id}</span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-text-white)', margin: 0 }}>{formatCurrency(totalPrice)}</h4>
        </div>
      </div>

      {/* Copy Notification Toast */}
      {showCopyNotice && (
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          background: 'rgba(213, 196, 171, 0.12)',
          border: '1px solid var(--color-accent-gold)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-text-white)',
          letterSpacing: '0.12em'
        }}>
          <span className="gold-dot" />
          <span>CONFIGURATION LINK COPIED TO CLIPBOARD</span>
        </div>
      )}

      {/* PDF Error Notice */}
      {pdfErrorNotice && (
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          background: 'rgba(229, 83, 83, 0.12)',
          border: '1px solid #e55353',
          borderRadius: '4px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: '#e55353',
          letterSpacing: '0.05em'
        }}>
          SPECIFICATION COULD NOT BE GENERATED. PLEASE TRY AGAIN.
        </div>
      )}

      {/* Manual Copy Modal Fallback */}
      {showManualCopy && (
        <div className="enquiry-modal-overlay" onClick={() => setShowManualCopy(false)}>
          <div className="enquiry-modal-box" onClick={e => e.stopPropagation()}>
            <div className="enquiry-modal-header">
              <span className="eyebrow-tag">SHARE YOUR AURELIS</span>
              <h3 className="enquiry-modal-title" style={{ fontSize: '16px' }}>COPY CONFIGURATION LINK</h3>
              <button type="button" className="enquiry-close-btn" onClick={() => setShowManualCopy(false)}>×</button>
            </div>
            <div className="enquiry-modal-body">
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                Copy the URL below to share your exact LK Aurelis specification:
              </p>
              <input
                type="text"
                readOnly
                value={shareUrl}
                onClick={e => e.target.select()}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#070809',
                  border: '1px solid var(--color-accent-gold)',
                  color: 'var(--color-accent-gold)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div className="enquiry-modal-footer" style={{ marginTop: '16px' }}>
              <button type="button" className="btn btn-solid" onClick={() => setShowManualCopy(false)} style={{ width: '100%' }}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="summary-actions-group" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          type="button"
          className="btn btn-solid"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={onRequestEnquiry}
        >
          REQUEST AN ENQUIRY
        </button>

        <button
          type="button"
          disabled={isGeneratingPdf}
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={handleDownloadPdf}
        >
          {isGeneratingPdf ? 'GENERATING SPECIFICATION...' : 'DOWNLOAD SPECIFICATION'}
        </button>

        <button
          type="button"
          disabled={isSharing}
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'center', opacity: 0.9 }}
          onClick={handleShare}
        >
          {isSharing ? 'PREPARING LINK...' : 'SHARE YOUR AURELIS'}
        </button>

        <button
          type="button"
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'center', opacity: 0.75 }}
          onClick={onResetConfig}
        >
          START A NEW CONFIGURATION
        </button>
      </div>
    </div>
  )
}
