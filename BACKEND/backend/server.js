require('dotenv').config({ path: require('path').resolve(__dirname, '.env') })
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const observationRoutes = require('./routes/observations')
const mapRoutes = require('./routes/map')
const errorHandler = require('./middleware/errorHandler')

connectDB()

const app = express()

app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      'http://localhost:5173',
      'https://ocean-lens.vercel.app'
    ]
    if (!origin || allowed.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api/observations', observationRoutes)
app.use('/api/map', mapRoutes)
app.use(errorHandler)

app.get('/', (req, res) => res.json({ status: 'OceanLens running' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))