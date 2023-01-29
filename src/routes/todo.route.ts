export {}
var router = require('express').Router()
const {postNewTodo, getTodos, getTodo, deleteTodo, updateTodo} = require('../controllers/todo.controller')
import authentication from '../middlewares/authentication.mid'

router.get('/:todoId',authentication, getTodo)

router.get('/',authentication, getTodos)

router.post('/',authentication, postNewTodo)

router.put('/:todoId', authentication, updateTodo)

router.delete('/:todoId',authentication, deleteTodo)

// export default router
module.exports=router