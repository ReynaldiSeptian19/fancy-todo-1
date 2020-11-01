const router = require('express').Router()
const todoRouter = require('./todo')
const userRouter = require('./user')
const weatherRouter = require('./weather')

router.use('/todo', todoRouter)
router.use('/user', userRouter)
router.use('/weather', weatherRouter)

module.exports = router