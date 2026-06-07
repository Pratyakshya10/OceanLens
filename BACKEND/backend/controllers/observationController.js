const Observation = require('../models/Observation')
const { analyzeImage } = require('../services/aiService')

const createObservation = async (req, res) => {
  try {
    const { lat, lng, submitterName, language } = req.body
    const imageUrl  = req.file ? req.file.path : null
    const imagePath = req.file ? req.file.path : null
    console.log('File received:', JSON.stringify(req.file))

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

const exportCSV = async (req, res) => {
  try {
    const obs = await Observation.find().sort({ createdAt: -1 })
    const headers = ['id', 'submitterName', 'lat', 'lng', 'species', 'bleachingLevel', 'aiSummary', 'confidence', 'aiProcessed', 'createdAt']
    const rows = obs.map(o => [
      o._id,
      o.submitterName || 'Anonymous',
      o.lat,
      o.lng,
      o.species || '',
      o.bleachingLevel ?? '',
      `"${(o.aiSummary || '').replace(/"/g, '""')}"`,
      o.confidence ?? '',
      o.aiProcessed,
      o.createdAt.toISOString()
    ].join(','))

    const csv = [headers.join(','), ...rows].join('\n')
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="oceanlens-observations.csv"')
    res.send(csv)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { createObservation, getObservations, exportCSV }