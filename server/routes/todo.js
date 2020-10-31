const router = require('express').Router()
const controller = require('../controllers/TodoController')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authenticate)
router.post('/', controller.addTodo)
router.get('/', controller.readTodo)
router.get('/:id', controller.readById)
router.put('/:id',authorization, controller.editTodo)
router.patch('/:id',authorization, controller.updateTodo)
router.delete('/:id',authorization, controller.delete)



module.exports = router 