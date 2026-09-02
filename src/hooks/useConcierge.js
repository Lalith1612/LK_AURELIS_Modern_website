import { useState, useCallback, useRef } from 'react'
import { sendConciergeMessage } from '../services/conciergeClient.js'

const INITIAL_WELCOME_MESSAGE = {
  id: 'msg-welcome',
  role: 'model',
  content:
    'Welcome to AURELIS.\n\nI can guide you through the vehicle, explain its technology, compare specifications, or help shape your configuration.',
  actions: [
    { type: 'navigate', target: 'performance', label: 'EXPLORE PERFORMANCE' },
    { type: 'navigate', target: 'charging', label: 'WHAT DOES 800V MEAN?' },
    { type: 'navigate', target: 'configure', label: 'CONFIGURE AURELIS' }
  ],
  isWelcome: true
}

export function useConcierge({ currentConfiguration = null, currentSection = '' } = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [messages, setMessages] = useState([INITIAL_WELCOME_MESSAGE])
  const messagesRef = useRef(messages)
  messagesRef.current = messages

  const isPendingRef = useRef(isPending)
  isPendingRef.current = isPending

  const triggerRef = useRef(null)

  const closeConcierge = useCallback(() => {
    setIsOpen(false)
    if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
      triggerRef.current.focus()
    }
  }, [])

  const toggleConcierge = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const resetChat = useCallback(() => {
    setMessages([INITIAL_WELCOME_MESSAGE])
    setIsPending(false)
  }, [])

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text || '').trim()
      if (!trimmed || isPendingRef.current) return

      const userMsgId = `msg-user-${Date.now()}`
      const modelMsgId = `msg-model-${Date.now() + 1}`

      const userMsg = {
        id: userMsgId,
        role: 'user',
        content: trimmed
      }

      const streamingModelMsg = {
        id: modelMsgId,
        role: 'model',
        content: '',
        actions: [],
        isStreaming: true
      }

      setMessages(prev => [...prev, userMsg, streamingModelMsg])
      setIsPending(true)

      try {
        const conversationHistory = messagesRef.current
          .filter(m => !m.isWelcome && m.content)

        const response = await sendConciergeMessage({
          message: trimmed,
          history: conversationHistory,
          context: { currentSection },
          currentConfiguration,
          onChunk: (accumulated) => {
            setMessages(prev =>
              prev.map(m => (m.id === modelMsgId ? { ...m, content: accumulated } : m))
            )
          }
        })

        setMessages(prev =>
          prev.map(m =>
            m.id === modelMsgId
              ? {
                  ...m,
                  content: response.message || m.content,
                  actions: response.actions || [],
                  isStreaming: false
                }
              : m
          )
        )
      } catch (err) {
        console.warn('AURELIS Concierge Error:', err)
        setMessages(prev =>
          prev.map(m =>
            m.id === modelMsgId
              ? {
                  ...m,
                  content:
                    'I encountered a temporary communication issue while connecting to the AURELIS intelligence service. Please try asking your question again.',
                  actions: [],
                  isStreaming: false
                }
              : m
          )
        )
      } finally {
        setIsPending(false)
      }
    },
    [currentSection, currentConfiguration]
  )

  const openConcierge = useCallback(
    (initialPrompt = '') => {
      setIsOpen(true)
      if (initialPrompt && typeof initialPrompt === 'string') {
        sendMessage(initialPrompt)
      }
    },
    [sendMessage]
  )

  return {
    isOpen,
    isPending,
    messages,
    openConcierge,
    closeConcierge,
    toggleConcierge,
    sendMessage,
    resetChat,
    triggerRef
  }
}
