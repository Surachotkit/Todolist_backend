const express = require('express')
const todoController =  require('../controllers/todo-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

const router = express.Router()

router.use(authenticateMiddleware)
router.post('/', todoController.createTodo)

module.exports = router