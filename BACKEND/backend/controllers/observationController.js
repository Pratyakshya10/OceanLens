const Observation = require('../models/Observation')
// const { analyzeImage } = require('../services/aiService') // uncomment Week 2

const createObservation = async (req, res) => {
  try {
    const { lat, lng, submitterName, language } = req.body
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null

    const obs = await Observation.create({
      lat,
      lng,
      imageUrl,
      submitterName: submitterName || 'Anonymous',
      language: language || 'en'
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