const router = require('express').Router()
const upload = require('../middleware/upload')
const { createObservation, getObservations } = require('../controllers/observationController')

router.post('/', upload.single('image'), createObservation)
router.get('/', getObservations)

module.exports = router