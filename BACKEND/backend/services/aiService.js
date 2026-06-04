const { GoogleGenerativeAI } = require('@google/generative-ai')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const PROMPT = `Analyze this marine or water body photo.
Return ONLY valid JSON, no markdown, no backticks, no extra text:
{
  "species": "main species or subject visible, or null",
  "bleachingLevel": 0-4 on CoralWatch scale or null if not coral,
  "aiSummary": "2-3 plain sentences describing water health, species seen, and any concerns",
  "confidence": 0.0 to 1.0
}
CoralWatch scale: 0=healthy, 1=pale, 2=partial bleach, 3=mostly bleached, 4=fully bleached.`

const analyzeImage = async (imagePath, lang = 'en') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const imageData = {
      inlineData: {
        data: fs.readFileSync(imagePath).toString('base64'),
        mimeType: 'image/jpeg'
      }
    }
    const result = await model.generateContent([PROMPT, imageData])
    const text = result.response.text().trim()
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