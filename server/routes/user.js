const router = require('express').Router()
const Controller = require('../controllers/UserController')

router.post('/login',Controller.login)
router.post('/register',Controller.register)
router.post('/googlelogin', Controller.googleLogin)

module.exports = router