import { BASE_VEHICLE_PRICE, FINISHES, WHEELS, INTERIORS, DETAILS } from '../src/data/configuratorData.js'

/**
 * Server-side input sanitizer
 * Removes HTML tags and control characters to prevent injection.
 */
function sanitizeString(str, maxLen = 500) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[\r\n\t]/g, ' ') // Strip control linebreaks
    .trim()
    .slice(0, maxLen)
}

/**
 * Authoritative Server-Side Price Recalculation
 * Never trusts prices submitted by client.
 */
function calculateAuthoritativePrice(cfg) {
  const exterior = FINISHES.find(f => f.id === cfg.exteriorId) || FINISHES[0]
  const wheel = WHEELS.find(w => w.id === cfg.wheelId) || WHEELS[0]
  const interior = INTERIORS.find(i => i.id === cfg.interiorId) || INTERIORS[0]
  const detail = DETAILS.find(d => d.id === cfg.detailId) || DETAILS[0]

  const optionsTotal = exterior.price + wheel.price + interior.price + detail.price
  const totalPrice = BASE_VEHICLE_PRICE + optionsTotal

  return {
    exterior,
    wheel,
    interior,
    detail,
    basePrice: BASE_VEHICLE_PRICE,
    optionsTotal,
    totalPrice
  }
}

/**
 * Core Concierge Delivery Handler
 */
export async function handleEnquirySubmission(payload) {
  if (!payload || !payload.customer || !payload.configuration) {
    return {
      status: 400,
      body: { success: false, error: 'Invalid payload submitted.' }
    }
  }

  const { customer, configuration, configurationId } = payload

  // 1. Sanitize customer inputs
  const sanitizedCustomer = {
    firstName: sanitizeString(customer.firstName, 100),
    lastName: sanitizeString(customer.lastName, 100),
    email: sanitizeString(customer.email, 150),
    phone: sanitizeString(customer.phone, 50),
    country: sanitizeString(customer.country, 100),
    preferredContact: customer.preferredContact === 'phone' ? 'phone' : 'email',
    message: sanitizeString(customer.message, 1000)
  }

  // Basic server-side email validation
  if (!sanitizedCustomer.firstName || !sanitizedCustomer.lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedCustomer.email)) {
    return {
      status: 400,
      body: { success: false, error: 'Validation failure on customer fields.' }
    }
  }

  // 2. Authoritative Server-Side Price Verification
  const verifiedPricing = calculateAuthoritativePrice(configuration)

  // 3. Format Concierge Delivery Email Text
  const emailContent = `
==================================================
LK AURELIS — DIGITAL CONCIERGE ENQUIRY
==================================================

CONFIGURATION REFERENCE: ${configurationId || 'LK-AUR-UNKNOWN'}
REGISTERED AT: ${new Date().toISOString()}

--------------------------------------------------
CUSTOMER DETAILS
--------------------------------------------------
Name: ${sanitizedCustomer.firstName} ${sanitizedCustomer.lastName}
Email: ${sanitizedCustomer.email}
Phone: ${sanitizedCustomer.phone}
Country / Region: ${sanitizedCustomer.country}
Preferred Contact: ${sanitizedCustomer.preferredContact.toUpperCase()}
Notes: ${sanitizedCustomer.message || 'None provided'}

--------------------------------------------------
AUTHORITATIVE SPECIFICATION & PRICING
--------------------------------------------------
Exterior Paint: ${verifiedPricing.exterior.name} (+$${verifiedPricing.exterior.price})
Wheel Package: ${verifiedPricing.wheel.name} ${verifiedPricing.wheel.size} (+$${verifiedPricing.wheel.price})
Interior Theme: ${verifiedPricing.interior.name} (+$${verifiedPricing.interior.price})
Detail Package: ${verifiedPricing.detail.name} (+$${verifiedPricing.detail.price})

Base Vehicle Specification: $${verifiedPricing.basePrice.toLocaleString()}
Selected Optional Equipment: +$${verifiedPricing.optionsTotal.toLocaleString()}
--------------------------------------------------
TOTAL SPECIFICATION VALUE: $${verifiedPricing.totalPrice.toLocaleString()}
==================================================
`

  // Check if provider credentials exist in environment
  const env = typeof process !== 'undefined' ? process.env : {}
  const targetEmail = env.CONCIERGE_DELIVERY_EMAIL
  const apiKey = env.ENQUIRY_DELIVERY_API_KEY
  const smtpHost = env.SMTP_HOST

  const hasLiveCredentials = Boolean(targetEmail && (apiKey || smtpHost))

  return {
    status: 200,
    body: {
      success: true,
      registeredAt: new Date().toISOString(),
      id: configurationId,
      verifiedPrice: verifiedPricing.totalPrice,
      isProviderConfigured: hasLiveCredentials,
      formattedEmail: emailContent
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` })
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const result = await handleEnquirySubmission(payload)
    return res.status(result.status).json(result.body)
  } catch (err) {
    console.error('LK Aurelis API Error:', err)
    return res.status(500).json({ success: false, error: 'Internal server error.' })
  }
}
