/**
 * AURELIS Digital Concierge Client Service
 * Communicates strictly with the secure server-side endpoint (/api/concierge).
 * Zero API keys or AI SDKs exist in the client bundle.
 */

export async function sendConciergeMessage({
  message,
  history = [],
  context = {},
  currentConfiguration = null,
  onChunk = null
}) {
  if (!message || typeof message !== 'string' || !message.trim()) {
    throw new Error('Message cannot be empty.')
  }

  const payload = {
    message: message.trim().slice(0, 600),
    history: history.slice(-10).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      content: String(m.content || '').slice(0, 1000)
    })),
    context: {
      currentPath: typeof window !== 'undefined' ? window.location.pathname : '/',
      currentSection: context.currentSection || ''
    },
    currentConfiguration: currentConfiguration || null
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 20000)

  try {
    const res = await fetch('/api/concierge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream, application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (res.status === 429) {
      return {
        success: true,
        message: 'The concierge is receiving a high number of requests. Please allow a moment before asking your next question.',
        actions: []
      }
    }

    const contentType = res.headers.get('content-type') || ''

    // Real-time EventSource / SSE stream decoder
    if (res.ok && contentType.includes('text/event-stream') && res.body) {
      const reader = res.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let accumulatedText = ''
      let actions = []
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmedLine = line.trim()
          if (!trimmedLine.startsWith('data:')) continue

          const jsonStr = trimmedLine.replace(/^data:\s*/, '')
          try {
            const data = JSON.parse(jsonStr)
            if (data.chunk) {
              accumulatedText += data.chunk
              if (typeof onChunk === 'function') {
                onChunk(accumulatedText)
              }
            }
            if (data.fullText && (!accumulatedText || accumulatedText.length < data.fullText.length)) {
              accumulatedText = data.fullText
              if (typeof onChunk === 'function') {
                onChunk(accumulatedText)
              }
            }
            if (data.actions) {
              actions = data.actions
            }
          } catch (e) {
            // Ignore malformed partial chunks
          }
        }
      }

      return {
        success: true,
        message: accumulatedText || 'I am ready to guide you through the LK AURELIS.',
        actions,
        isFallback: false
      }
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      return {
        success: true,
        message: errorData.error || 'The AURELIS Digital Concierge is temporarily unavailable.',
        actions: []
      }
    }

    const data = await res.json()
    return {
      success: true,
      message: data.message || 'I am ready to guide you through the LK AURELIS.',
      actions: Array.isArray(data.actions) ? data.actions : [],
      isFallback: Boolean(data.isFallback)
    }
  } catch (err) {
    clearTimeout(timeoutId)
    if (err.name === 'AbortError') {
      return {
        success: true,
        message: 'The request timed out. Please try asking your question again.',
        actions: []
      }
    }
    console.warn('AURELIS Concierge network exception:', err)
    return {
      success: true,
      message: 'The AURELIS Digital Concierge is currently offline or unreachable. Please try again in a moment.',
      actions: []
    }
  }
}
