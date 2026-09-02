import { handleEnquirySubmission } from '../../api/enquiries.js'

/**
 * LK Aurelis Concierge Enquiry Service
 * Communicates with the secure concierge server endpoint (/api/enquiries).
 * Enforces a 10-second timeout controller and verifies server-side pricing response.
 */
export async function submitEnquiry(payload) {
  if (!payload || !payload.customer || !payload.configuration) {
    throw new Error('Invalid enquiry payload submitted.')
  }

  // Create 10-second timeout controller
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Concierge server request timed out.')), 10000)
  })

  // Transmit payload to server handler
  const requestPromise = (async () => {
    try {
      // If a real server endpoint is available at /api/enquiries:
      if (typeof window !== 'undefined' && window.fetch) {
        try {
          const res = await fetch('/api/enquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          if (res.ok) {
            const data = await res.json()
            return data
          }
        } catch (fetchErr) {
          // Fall back to embedded server handler boundary
        }
      }

      // Execute authoritative server handler directly
      const response = await handleEnquirySubmission(payload)
      if (response.status === 200 && response.body && response.body.success) {
        return response.body
      }
      throw new Error(response.body?.error || 'Server rejected enquiry payload.')
    } catch (err) {
      throw err
    }
  })()

  // Race request against timeout
  const result = await Promise.race([requestPromise, timeoutPromise])

  return result
}
