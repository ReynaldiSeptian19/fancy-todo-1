const router = require('express').Router()
const Controller = require('../controllers/UserController')

router.post('/login',Controller.login)
router.post('/register',Controller.register)

module.exports = router