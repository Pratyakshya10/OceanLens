const Observation = require('../models/Observation')
const { analyzeImage } = require('../services/aiService')

const createObservation = async (req, res) => {
  try {
    const { lat, lng, submitterName, language } = req.body
    const imageUrl  = req.file ? `/uploads/${req.file.filename}` : null
    const imagePath = req.file ? req.file.path : null

    let aiResult = {
      species: null, bleachingLevel: null,
      aiSummary: 'No image provided',
      confidence: null, aiProcessed: false
    }

    if (imagePath) {
      aiResult = await analyzeImage(imagePath, language || 'en')
    }

    const obs = await Observation.create({
      lat, lng, imageUrl,
      submitterName: submitterName || 'Anonymous',
      language: language || 'en',
      ...aiResult
    })
    res.status(201).json(obs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getObservations = async (req, res) => {
  try {
    const obs = await Observation.find().sort({ createdAt: -1 })
    res.json(obs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { createObservation, getObservations }