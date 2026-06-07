const dns = require('dns')
const mongoose = require('mongoose')

dns.setServers(['8.8.8.8', '8.8.4.4'])

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('DB error:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB