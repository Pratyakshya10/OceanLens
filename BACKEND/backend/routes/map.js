const router = require('express').Router()
const { getMapPoints } = require('../controllers/mapController')

router.get('/points', getMapPoints)

module.exports = router