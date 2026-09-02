import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { formatCurrency } from './formatters'

// Helper to fetch image, convert to data URL and get natural dimensions
async function loadHeroImage(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`)
  }
  const blob = await response.blob()
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })

  const dimensions = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = (err) => reject(new Error('Failed to load image element for dimensions.'))
    img.src = dataUrl
  })

  return { dataUrl, ...dimensions }
}

async function loadHeroImageWithFallback(selectedUrl) {
  try {
    return await loadHeroImage(selectedUrl)
  } catch (err) {
    console.warn(`LK Aurelis: Failed to load selected image ${selectedUrl}, attempting fallback.`, err)
    try {
      return await loadHeroImage('/assets/aurelis-hero.jpg')
    } catch (fallbackErr) {
      console.error('LK Aurelis: Fallback image also failed to load.', fallbackErr)
      throw fallbackErr
    }
  }
}

export async function generateSpecificationPdf(configState, basePrice, totalPrice, optionsTotal) {
  if (!configState || !configState.id) {
    throw new Error('Invalid configuration state provided for PDF generation.')
  }

  // Start loading the hero image immediately in the background
  const imgPromise = loadHeroImageWithFallback(configState.exterior?.img)

  // Create temporary off-screen container for crisp canvas rendering
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.top = '-9999px'
  container.style.width = '794px' // A4 width at 96 DPI
  container.style.background = '#070809'
  container.style.color = '#f4f1ea'
  container.style.fontFamily = "'Inter', system-ui, -apple-system, sans-serif"
  container.style.padding = '40px'
  container.style.boxSizing = 'border-box'

  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).toUpperCase()

  const htmlContent = `
    <div style="border: 1px solid rgba(213, 196, 171, 0.3); padding: 32px; background: rgba(255,255,255,0.01);">
      <!-- Header Plaque -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(213, 196, 171, 0.2); padding-bottom: 20px; margin-bottom: 24px;">
        <div>
          <span style="font-family: monospace; font-size: 10px; color: #d5c4ab; letter-spacing: 0.2em; display: block;">AUTOMOBILI AURELIS</span>
          <h1 style="font-family: 'Cinzel', Georgia, serif; font-size: 26px; color: #ffffff; margin: 4px 0 0 0; letter-spacing: 0.15em;">LK AURELIS</h1>
          <span style="font-size: 11px; color: #8e8e93; letter-spacing: 0.1em;">CONFIGURATION SPECIFICATION</span>
        </div>
        <div style="text-align: right;">
          <span style="font-family: monospace; font-size: 10px; color: #d5c4ab; letter-spacing: 0.15em; display: block;">SPECIFICATION REFERENCE</span>
          <strong style="font-family: monospace; font-size: 16px; color: #ffffff; display: block; margin-top: 4px;">${configState.id}</strong>
          <span style="font-family: monospace; font-size: 9px; color: #8e8e93; display: block; margin-top: 2px;">DATE: ${dateStr}</span>
        </div>
      </div>

      <!-- Hero Vehicle Image Frame (solid black container for overlay rendering) -->
      <div id="pdf-hero-image-frame" style="width: 100%; height: 260px; overflow: hidden; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; background: #000; position: relative;">
        <img src="${configState.exterior?.img || ''}" style="width: 100%; height: 100%; object-fit: cover; visibility: hidden;" alt="LK Aurelis Build" />
      </div>

      <!-- Specification Grid -->
      <div style="margin-bottom: 24px;">
        <span style="font-family: monospace; font-size: 10px; color: #d5c4ab; letter-spacing: 0.2em; display: block; margin-bottom: 12px;">BESPOKE SELECTIONS</span>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="padding: 10px 0; font-family: monospace; font-size: 10px; color: #8e8e93; width: 30%;">01 EXTERIOR PAINT</td>
            <td style="padding: 10px 0; font-size: 13px; color: #ffffff; font-weight: 600;">${configState.exterior.name}</td>
            <td style="padding: 10px 0; font-family: monospace; font-size: 11px; color: #d5c4ab; text-align: right;">${formatCurrency(configState.exterior.price, true)}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="padding: 10px 0; font-family: monospace; font-size: 10px; color: #8e8e93;">02 WHEEL PACKAGE</td>
            <td style="padding: 10px 0; font-size: 13px; color: #ffffff; font-weight: 600;">${configState.wheel.name} ${configState.wheel.size}</td>
            <td style="padding: 10px 0; font-family: monospace; font-size: 11px; color: #d5c4ab; text-align: right;">${formatCurrency(configState.wheel.price, true)}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="padding: 10px 0; font-family: monospace; font-size: 10px; color: #8e8e93;">03 INTERIOR THEME</td>
            <td style="padding: 10px 0; font-size: 13px; color: #ffffff; font-weight: 600;">${configState.interior.name}</td>
            <td style="padding: 10px 0; font-family: monospace; font-size: 11px; color: #d5c4ab; text-align: right;">${formatCurrency(configState.interior.price, true)}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="padding: 10px 0; font-family: monospace; font-size: 10px; color: #8e8e93;">04 DETAIL PACKAGE</td>
            <td style="padding: 10px 0; font-size: 13px; color: #ffffff; font-weight: 600;">${configState.detail.name}</td>
            <td style="padding: 10px 0; font-family: monospace; font-size: 11px; color: #d5c4ab; text-align: right;">${formatCurrency(configState.detail.price, true)}</td>
          </tr>
        </table>
      </div>

      <!-- Performance Specs Row -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 14px; background: rgba(213, 196, 171, 0.03); border: 1px solid rgba(213, 196, 171, 0.15); border-radius: 4px; margin-bottom: 24px;">
        <div>
          <span style="font-family: monospace; font-size: 8px; color: #8e8e93; display: block;">DRIVETRAIN</span>
          <strong style="font-size: 11px; color: #ffffff;">Dual-Motor AWD</strong>
        </div>
        <div>
          <span style="font-family: monospace; font-size: 8px; color: #8e8e93; display: block;">PEAK POWER</span>
          <strong style="font-size: 11px; color: #ffffff;">620 kW</strong>
        </div>
        <div>
          <span style="font-family: monospace; font-size: 8px; color: #8e8e93; display: block;">WLTP RANGE</span>
          <strong style="font-size: 11px; color: #ffffff;">720 km</strong>
        </div>
        <div>
          <span style="font-family: monospace; font-size: 8px; color: #8e8e93; display: block;">0–100 KM/H</span>
          <strong style="font-size: 11px; color: #ffffff;">3.4 s</strong>
        </div>
      </div>

      <!-- Pricing Summary Plaque -->
      <div style="padding: 20px; background: rgba(255,255,255,0.02); border: 1px solid rgba(213, 196, 171, 0.3); border-radius: 4px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-family: monospace; font-size: 10px; color: #8e8e93;">BASE VEHICLE SPECIFICATION</span>
          <strong style="font-family: monospace; font-size: 12px; color: #ffffff;">${formatCurrency(basePrice)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="font-family: monospace; font-size: 10px; color: #8e8e93;">SELECTED OPTIONAL EQUIPMENT</span>
          <strong style="font-family: monospace; font-size: 12px; color: #d5c4ab;">${formatCurrency(optionsTotal, true)}</strong>
        </div>
        <div style="border-top: 1px solid rgba(213, 196, 171, 0.2); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: monospace; font-size: 11px; color: #d5c4ab; letter-spacing: 0.15em;">CONFIGURATION TOTAL</span>
          <strong style="font-family: 'Cinzel', Georgia, serif; font-size: 22px; color: #ffffff;">${formatCurrency(totalPrice)}</strong>
        </div>
      </div>

      <!-- Footer Disclaimer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
        <span style="font-family: monospace; font-size: 9px; color: #8e8e93;">LK AURELIS DIGITAL SHOWROOM ARTIFACT</span>
        <span style="font-family: monospace; font-size: 9px; color: #d5c4ab;">CONF-REF: ${configState.id}</span>
      </div>
    </div>
  `

  container.innerHTML = htmlContent
  document.body.appendChild(container)

  // Measure placement frame positions relative to container
  const frameElement = container.querySelector('#pdf-hero-image-frame')
  const frameRect = frameElement ? frameElement.getBoundingClientRect() : null
  const containerRect = container.getBoundingClientRect()

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#070809',
      logging: false
    })

    document.body.removeChild(container)

    // Load original image in its native quality
    const heroImg = await imgPromise

    const imgData = canvas.toDataURL('image/jpeg', 0.95)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    // Draw specification plaque template
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)

    // Overlay vehicle image onto the placeholder frame area
    if (frameRect && containerRect && heroImg) {
      const scaleFactor = pdfWidth / containerRect.width
      const pdfFrameX = (frameRect.left - containerRect.left) * scaleFactor
      const pdfFrameY = (frameRect.top - containerRect.top) * scaleFactor
      const pdfFrameWidth = frameRect.width * scaleFactor
      const pdfFrameHeight = frameRect.height * scaleFactor

      // Compute display bounds based on contain-style aspect ratio scaling
      const frameRatio = pdfFrameWidth / pdfFrameHeight
      const imageRatio = heroImg.width / heroImg.height

      let drawW, drawH
      if (imageRatio > frameRatio) {
        drawW = pdfFrameWidth
        drawH = pdfFrameWidth / imageRatio
      } else {
        drawH = pdfFrameHeight
        drawW = pdfFrameHeight * imageRatio
      }

      // Center the image within the bounding frame
      const drawX = pdfFrameX + (pdfFrameWidth - drawW) / 2
      const drawY = pdfFrameY + (pdfFrameHeight - drawH) / 2

      const imageFormat = heroImg.dataUrl.startsWith('data:image/png') ? 'PNG' : 'JPEG'
      pdf.addImage(heroImg.dataUrl, imageFormat, drawX, drawY, drawW, drawH)
    }

    pdf.save(`LK-AURELIS-${configState.id}.pdf`)
  } catch (err) {
    if (document.body.contains(container)) {
      document.body.removeChild(container)
    }
    console.error('LK Aurelis: PDF generation failed', err)
    throw err
  }
}

