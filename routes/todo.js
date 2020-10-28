const router = require('express').Router()
const controller = require('../controllers/TodoController')
const authenticate = require('../middlewares/authentication')

router.use(authenticate)
router.post('/', controller.addTodo)
router.get('/', controller.readTodo)
router.get('/:id', controller.readById)
router.put('/:id', controller.editTodo)
router.patch('/:id', controller.updateTodo)
router.delete('/:id', controller.delete)



module.exports = router 