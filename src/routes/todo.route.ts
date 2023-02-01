export {}
var router = require('express').Router()
const addStat = require('../middlewares/addStat.mid')
const {postNewTodo, getTodos, getTodo, deleteTodo, updateTodo} = require('../controllers/todo.controller')
const {getAllTodo} = require('../controllers/all.controllers')
import authentication from '../middlewares/authentication.mid'

router.get('/all', authentication, addStat, getAllTodo)

router.get('/:todoId',authentication, addStat, getTodo)

router.get('/',authentication, addStat, getTodos)

router.post('/',authentication, addStat, postNewTodo)

router.put('/:todoId', authentication, addStat, updateTodo)

router.delete('/:todoId',authentication, addStat, deleteTodo)

// export default router
module.exports=router