import { boolean } from "webidl-conversions"

const {model, Schema, SchemaTypes, ObjectId} = require('mongoose')
const User = require('./User.model')

const DataSchema = new Schema(
    {
        userId: ObjectId,
        method:{
            type:String,
            url:String
        },
        url:{
            type: String,
            url: String
        }
    },{
        timestamps: true
    }
)

module.exports = model('Data', DataSchema)
