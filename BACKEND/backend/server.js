require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const observationRoutes = require('./routes/observations')
const mapRoutes = require('./routes/map')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config()

connectDB()

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api/observations', observationRoutes)
app.use('/api/map', mapRoutes)
app.use(errorHandler)

app.get('/', (req, res) => res.json({ status: 'OceanLens running' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))