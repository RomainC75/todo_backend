import { boolean } from "webidl-conversions"

const {model, Schema, SchemaTypes} = require('mongoose')
const User = require('./User.model')

const TodoSchema = new Schema(
    {
        todo:{
            type: String,
            required: true  
        },
        details:{
            type: String,
            required: true
        },
        isDone:{
            type: Boolean,
            default: false
        }
    },{
        timestamps: true
    }
)

module.exports = model('Todo', TodoSchema)


        // userId: {
        //     type: SchemaTypes.ObjectId,
        //     required: true,
        //     ref: "User"
        // },