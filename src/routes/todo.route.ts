const router = require('express').Router()
const {postNewTodo, getTodos} = require('../controllers/todo.controller')

router.get('/',getTodos)
router.post('/',postNewTodo)


module.exports = router