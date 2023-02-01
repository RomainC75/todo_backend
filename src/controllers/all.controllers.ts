import { TodoInterface } from "../@types/todo.type"
import { UserInterface } from "../@types/user.type"

const User = require('../models/User.model')
const Todo = require('../models/Todo.model')

exports.getAllTodo = async(req,res,next) =>{
    try {
        const users:UserInterface[] = await User.find({})
        let ans = await Todo.find({})
        ans = ans.map(todo => {
            const user = users.find(user=>user._id.toString()===todo.userId.toString()) 
            return {
                ...todo._doc,
                userEmail : user ? user.email : 'null'
            }
        });
        res.status(200).json(ans)
    } catch (error) {
        next(error)
    }
}

