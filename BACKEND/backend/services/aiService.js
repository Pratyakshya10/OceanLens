const Groq = require('groq-sdk')
const fs = require('fs')
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })

let groq = null
const getGroq = () => {
  if (!groq) groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
  return groq
}

const PROMPT = `You are an expert marine and freshwater ecologist analyzing a water body photograph.

Identify ALL visible species, organisms, or environmental subjects — including fish, birds, mammals, reptiles, insects, algae, aquatic plants, coral, jellyfish, plastic debris, pollution indicators, or any other subject visible near or in the water.

Return ONLY valid JSON, no markdown, no backticks, no extra text:
{
  "species": "specific common name of the most prominent species, organism, or subject visible (e.g. 'Water hyacinth', 'Irrawaddy dolphin', 'Staghorn coral', 'Plastic debris', 'Cyanobacterial bloom', 'Flamingo') — never return null, always identify something",
  "bleachingLevel": 0-4 on CoralWatch scale if coral is visible, otherwise null,
  "aiSummary": "2-3 plain sentences describing: (1) what species or subject is visible, (2) the overall water health and ecosystem condition, (3) any environmental concerns or notable observations",
  "confidence": 0.0 to 1.0
}

CoralWatch bleaching scale (only if coral visible): 0=healthy, 1=pale, 2=partial bleach, 3=mostly bleached, 4=fully bleached.

If no living organism is visible, identify the dominant environmental feature (e.g. 'Plastic pollution', 'Industrial discharge', 'Algal bloom', 'Turbid water', 'Oil spill').`

const analyzeImage = async (imagePathOrUrl, lang = 'en') => {
  try {
    let imageContent

    if (imagePathOrUrl.startsWith('http')) {
      imageContent = {
        type: 'image_url',
        image_url: { url: imagePathOrUrl }
      }
    } else {
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
      max_tokens: 600
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