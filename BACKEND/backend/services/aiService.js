const Groq = require('groq-sdk')
const fs = require('fs')
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })

let groq = null
const getGroq = () => {
  if (!groq) groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
  return groq
}

const PROMPT = `Analyze this marine or water body photo.
Return ONLY valid JSON, no markdown, no backticks, no extra text:
{
  "species": "main species or subject visible, or null",
  "bleachingLevel": 0-4 on CoralWatch scale or null if not coral,
  "aiSummary": "2-3 plain sentences describing water health, species seen, and any concerns",
  "confidence": 0.0 to 1.0
}
CoralWatch scale: 0=healthy, 1=pale, 2=partial bleach, 3=mostly bleached, 4=fully bleached.`

const analyzeImage = async (imagePathOrUrl, lang = 'en') => {
  try {
    let imageContent

    // Check if it's a Cloudinary URL or a local file path
    if (imagePathOrUrl.startsWith('http')) {
      // Cloudinary URL — pass directly as image_url
      imageContent = {
        type: 'image_url',
        image_url: { url: imagePathOrUrl }
      }
    } else {
      // Local file — read and convert to base64
      const imageData = fs.readFileSync(imagePathOrUrl).toString('base64')
      const ext = imagePathOrUrl.split('.').pop().toLowerCase()
      const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg'
      imageContent = {
        type: 'image_url',
        image_url: { url: `data:${mimeType};base64,${imageData}` }
      }
    }

    const result = await getGroq().chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: PROMPT },
            imageContent
          ]
        }
      ],
      max_tokens: 500
    })

    const text = result.choices[0].message.content.trim()
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    return { ...parsed, aiProcessed: true }
  } catch (err) {
    console.error('AI error:', err.message)
    return {
      species: null,
      bleachingLevel: null,
      aiSummary: 'AI analysis unavailable right now.',
      confidence: null,
      aiProcessed: false
    }
  }
}

module.exports = { analyzeImage }