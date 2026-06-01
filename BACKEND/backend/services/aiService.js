// Week 2 — uncomment when ready
// const Anthropic = require('@anthropic-ai/sdk')
// const client = new Anthropic()

const analyzeImage = async (imageBuffer, lang = 'en') => {
  // TODO: call Claude Vision here
  return {
    species:        null,
    bleachingLevel: null,
    aiSummary:      'AI analysis coming soon',
    confidence:     null,
    aiProcessed:    false
  }
}

module.exports = { analyzeImage }