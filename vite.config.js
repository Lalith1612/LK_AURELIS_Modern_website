import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { handleConciergeRequest, streamConciergeRequest } from './api/concierge.js'
import { handleEnquirySubmission } from './api/enquiries.js'

function refreshEnvVariables(mode = 'development') {
  const env = loadEnv(mode, process.cwd(), '')
  let apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || ''
  let modelName = env.GEMINI_MODEL || process.env.GEMINI_MODEL || 'gemini-3.6-flash'
  if (modelName === 'gemini-2.5-flash' || modelName === 'gemini-2.0-flash' || modelName === 'gemini-1.5-flash') {
    modelName = 'gemini-3.6-flash'
  }

  process.env.GEMINI_API_KEY = apiKey
  process.env.GEMINI_MODEL = modelName
  return { apiKey, modelName }
}

export default defineConfig(({ mode }) => {
  refreshEnvVariables(mode)

  return {
    plugins: [
      react(),
      {
        name: 'aurelis-api-dev-server',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.method === 'POST' && req.url === '/api/concierge') {
              refreshEnvVariables(mode)

              let bodyStr = ''
              req.on('data', chunk => {
                bodyStr += chunk
              })
              req.on('end', async () => {
                try {
                  const payload = JSON.parse(bodyStr || '{}')
                  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1'

                  if (req.headers.accept && req.headers.accept.includes('text/event-stream')) {
                    return streamConciergeRequest(payload, res, clientIp)
                  }

                  const result = await handleConciergeRequest(payload, clientIp)
                  res.statusCode = result.status
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(result.body))
                } catch (err) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ success: false, error: 'Internal server error.' }))
                }
              })
              return
            }

            if (req.method === 'POST' && req.url === '/api/enquiries') {
              let bodyStr = ''
              req.on('data', chunk => {
                bodyStr += chunk
              })
              req.on('end', async () => {
                try {
                  const payload = JSON.parse(bodyStr || '{}')
                  const result = await handleEnquirySubmission(payload)
                  res.statusCode = result.status
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(result.body))
                } catch (err) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ success: false, error: 'Internal server error.' }))
                }
              })
              return
            }

            next()
          })
        }
      }
    ]
  }
})
