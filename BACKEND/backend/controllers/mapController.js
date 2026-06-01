const Observation = require('../models/Observation')

const getMapPoints = async (req, res) => {
  try {
    const obs = await Observation.find().sort({ createdAt: -1 })
    const points = obs.map(o => ({
      id:             o._id,
      lat:            o.lat,
      lng:            o.lng,
      imageUrl:       o.imageUrl,
      submitterName:  o.submitterName,
      bleachingLevel: o.bleachingLevel,
      species:        o.species,
      aiSummary:      o.aiSummary,
      date:           o.createdAt
    }))
    res.json(points)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getMapPoints }