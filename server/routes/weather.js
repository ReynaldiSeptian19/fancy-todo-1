const router = require('express').Router()
const Controller = require('../controllers/WeatherController')
const authenticate = require('../middlewares/authentication')

router.use(authenticate)
router.get('/', Controller.showWeather)

module.exports = router