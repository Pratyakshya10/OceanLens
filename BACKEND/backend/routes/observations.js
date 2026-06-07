const router = require('express').Router()
const upload = require('../middleware/upload')
const { createObservation, getObservations, exportCSV } = require('../controllers/observationController')

router.post('/', upload.single('image'), createObservation)
router.get('/', getObservations)
router.get('/export/csv', exportCSV)

module.exports = router