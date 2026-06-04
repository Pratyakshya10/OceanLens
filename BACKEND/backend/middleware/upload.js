const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadDir = 'uploads/'
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random()*1e9)}`
    cb(null, unique + path.extname(file.originalname))
  }
})

module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = file.mimetype.startsWith('image/')
    cb(ok ? null : new Error('Images only'), ok)
  }
})