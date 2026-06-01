const { Schema, model } = require('mongoose')

const ObservationSchema = new Schema({
  lat:            { type: Number, required: true },
  lng:            { type: Number, required: true },
  imageUrl:       { type: String },
  submitterName:  { type: String, default: 'Anonymous' },
  language:       { type: String, default: 'en' },
  species:        { type: String,  default: null },
  bleachingLevel: { type: Number,  default: null },
  aiSummary:      { type: String,  default: 'AI analysis coming soon' },
  confidence:     { type: Number,  default: null },
  aiProcessed:    { type: Boolean, default: false }
}, { timestamps: true })

module.exports = model('Observation', ObservationSchema)