import { useState, useEffect, useRef } from 'react'
import { formatCurrency } from '../../utils/formatters'
import { submitEnquiry } from '../../services/enquiryService'

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Germany',
  'Switzerland',
  'United Arab Emirates',
  'Canada',
  'France',
  'Italy',
  'Japan',
  'Australia',
  'Singapore',
  'Monaco',
  'Other / International'
]

export default function EnquiryModal({ isOpen, onClose, configState, basePrice, totalPrice, optionsTotal }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'United States',
    preferredContact: 'email',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [serverVerifiedPrice, setServerVerifiedPrice] = useState(totalPrice)

  const modalRef = useRef(null)

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Accessibility focus management: Trap focus, set initial focus, and restore focus on close
  useEffect(() => {
    if (isOpen) {
      const previousFocus = document.activeElement

      // Shift focus inside the modal with a small delay for DOM rendering
      const firstInput = modalRef.current?.querySelector('#firstName') || modalRef.current?.querySelector('button')
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 50)
      }

      const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      
      const handleKeyTab = (e) => {
        if (e.key !== 'Tab') return

        const focusableElements = Array.from(modalRef.current?.querySelectorAll(focusableSelectors) || [])
        if (focusableElements.length === 0) return

        const firstEl = focusableElements[0]
        const lastEl = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          // Shift + Tab: Wrap from first to last
          if (document.activeElement === firstEl) {
            lastEl.focus()
            e.preventDefault()
          }
        } else {
          // Tab: Wrap from last to first
          if (document.activeElement === lastEl) {
            firstEl.focus()
            e.preventDefault()
          }
        }
      }

      window.addEventListener('keydown', handleKeyTab)

      return () => {
        window.removeEventListener('keydown', handleKeyTab)
        if (previousFocus && previousFocus.focus) {
          previousFocus.focus()
        }
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validate = () => {
    const errs = {}
    if (!formData.firstName.trim()) {
      errs.firstName = 'Please enter your first name.'
    }
    if (!formData.lastName.trim()) {
      errs.lastName = 'Please enter your last name.'
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errs.phone = 'Please enter your phone number.'
    }
    if (!formData.country.trim()) {
      errs.country = 'Please select your country or region.'
    }
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')

    const payload = {
      configurationId: configState.id,
      configuration: {
        exteriorId: configState.exterior.id,
        exteriorName: configState.exterior.name,
        wheelId: configState.wheel.id,
        wheelName: configState.wheel.name,
        interiorId: configState.interior.id,
        interiorName: configState.interior.name,
        detailId: configState.detail.id,
        detailName: configState.detail.name
      },
      pricing: {
        basePrice,
        optionsTotal,
        totalPrice
      },
      customer: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        country: formData.country.trim(),
        preferredContact: formData.preferredContact,
        message: formData.message.trim()
      }
    }

    try {
      const response = await submitEnquiry(payload)
      if (response && response.success) {
        if (response.verifiedPrice) {
          setServerVerifiedPrice(response.verifiedPrice)
        }
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error('Concierge enquiry submission error:', err)
      setStatus('error')
    }
  }

  const handleClose = () => {
    setStatus('idle')
    setErrors({})
    onClose()
  }

  return (
    <div className="enquiry-modal-overlay" onClick={handleClose}>
      <div ref={modalRef} className="enquiry-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: status === 'success' ? '560px' : '620px' }}>
        <div className="enquiry-modal-header">
          <span className="eyebrow-tag">LK AURELIS · CONCIERGE</span>
          <h3 className="enquiry-modal-title">
            {status === 'success' ? 'SPECIFICATION RECEIVED' : 'REQUEST AN ENQUIRY'}
          </h3>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent-gold)', marginTop: '4px', letterSpacing: '0.15em' }}>
            CONFIGURATION ID: {configState.id}
          </span>
          <button type="button" className="enquiry-close-btn" onClick={handleClose} aria-label="Close dialog">×</button>
        </div>

        <div className="enquiry-modal-body">
          {status === 'success' ? (
            <div className="enquiry-confirmation-plaque">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span className="gold-dot" />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--color-text-white)', margin: 0, letterSpacing: '0.05em' }}>
                  SPECIFICATION RECEIVED
                </h4>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                Thank you, <strong style={{ color: 'var(--color-text-white)' }}>{formData.firstName} {formData.lastName}</strong>. Your bespoke LK Aurelis specification has been received by our digital concierge team.
              </p>

              <div className="enquiry-summary-list" style={{ marginBottom: '20px' }}>
                <div className="enquiry-summary-row">
                  <span>01 EXTERIOR PAINT</span>
                  <strong>{configState.exterior.name}</strong>
                </div>
                <div className="enquiry-summary-row">
                  <span>02 WHEEL PACKAGE</span>
                  <strong>{configState.wheel.name} {configState.wheel.size}</strong>
                </div>
                <div className="enquiry-summary-row">
                  <span>03 INTERIOR THEME</span>
                  <strong>{configState.interior.name}</strong>
                </div>
                <div className="enquiry-summary-row">
                  <span>04 DETAIL PACKAGE</span>
                  <strong>{configState.detail.name}</strong>
                </div>
                <div className="enquiry-summary-row enquiry-price-row" style={{ paddingTop: '10px', borderTop: '1px solid var(--color-border-dark)' }}>
                  <span style={{ color: 'var(--color-accent-gold)' }}>CONFIGURATION TOTAL</span>
                  <strong className="gold-text" style={{ fontSize: '16px' }}>{formatCurrency(serverVerifiedPrice)}</strong>
                </div>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--color-accent-gold)', margin: 0 }}>
                We will contact you via {formData.preferredContact.toUpperCase()} at {formData.preferredContact === 'email' ? formData.email : formData.phone}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Configuration & Price Overview */}
              <div className="enquiry-summary-list" style={{ marginBottom: '16px', padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', border: '1px solid var(--color-border-dark)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-accent-gold)', letterSpacing: '0.15em' }}>BESPOKE SPECIFICATION</span>
                  <strong style={{ fontSize: '11px', color: 'var(--color-text-white)' }}>{configState.exterior.name} · {configState.wheel.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-muted)' }}>TOTAL ESTIMATED VALUE</span>
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent-gold)' }}>{formatCurrency(totalPrice)}</strong>
                </div>
              </div>

              <div className="enquiry-form-grid">
                <div className="enquiry-form-group">
                  <label className="enquiry-label" htmlFor="firstName">FIRST NAME *</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`enquiry-input ${errors.firstName ? 'has-error' : ''}`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <span className="enquiry-error-msg">{errors.firstName}</span>}
                </div>

                <div className="enquiry-form-group">
                  <label className="enquiry-label" htmlFor="lastName">LAST NAME *</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`enquiry-input ${errors.lastName ? 'has-error' : ''}`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <span className="enquiry-error-msg">{errors.lastName}</span>}
                </div>

                <div className="enquiry-form-group">
                  <label className="enquiry-label" htmlFor="email">EMAIL ADDRESS *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`enquiry-input ${errors.email ? 'has-error' : ''}`}
                    placeholder="name@domain.com"
                  />
                  {errors.email && <span className="enquiry-error-msg">{errors.email}</span>}
                </div>

                <div className="enquiry-form-group">
                  <label className="enquiry-label" htmlFor="phone">PHONE NUMBER *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={`enquiry-input ${errors.phone ? 'has-error' : ''}`}
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && <span className="enquiry-error-msg">{errors.phone}</span>}
                </div>

                <div className="enquiry-form-group">
                  <label className="enquiry-label" htmlFor="country">COUNTRY / REGION *</label>
                  <select
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className={`enquiry-select ${errors.country ? 'has-error' : ''}`}
                  >
                    {COUNTRIES.map(c => (
                      <option key={c} value={c} style={{ background: '#0b0c0e', color: '#fff' }}>{c}</option>
                    ))}
                  </select>
                  {errors.country && <span className="enquiry-error-msg">{errors.country}</span>}
                </div>

                <div className="enquiry-form-group">
                  <label className="enquiry-label">PREFERRED CONTACT *</label>
                  <div className="enquiry-radio-group">
                    <label className="enquiry-radio-label">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleChange}
                      />
                      EMAIL
                    </label>
                    <label className="enquiry-radio-label">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleChange}
                      />
                      PHONE
                    </label>
                  </div>
                </div>

                <div className="enquiry-form-group full-width">
                  <label className="enquiry-label" htmlFor="message">ADDITIONAL CONCIERGE NOTES (OPTIONAL)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="2"
                    value={formData.message}
                    onChange={handleChange}
                    className="enquiry-textarea"
                    placeholder="Specify delivery timeline, custom requests, or questions..."
                  />
                </div>
              </div>

              {status === 'error' && (
                <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(229,83,83,0.12)', border: '1px solid #e55353', borderRadius: '4px', fontSize: '11px', color: '#e55353', fontFamily: 'var(--font-mono)' }}>
                  <strong>ENQUIRY COULD NOT BE COMPLETED</strong>
                  <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-white)', fontSize: '11px' }}>
                    We were unable to submit your enquiry at this time. Please check your connection and try again. Your configuration and contact details have been preserved.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn btn-solid"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  {status === 'submitting' ? 'REGISTERING SPECIFICATION...' : 'REQUEST AN ENQUIRY'}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="btn btn-outline"
                  style={{ opacity: 0.8 }}
                >
                  CANCEL
                </button>
              </div>
            </form>
          )}

          {status === 'success' && (
            <div className="enquiry-modal-footer" style={{ marginTop: '16px' }}>
              <button type="button" className="btn btn-solid" onClick={handleClose} style={{ width: '100%', justifyContent: 'center' }}>
                RETURN TO YOUR AURELIS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
