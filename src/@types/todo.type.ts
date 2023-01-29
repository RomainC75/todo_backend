import {Types} from "mongoose"

export interface NewTodoInterface {
    todo: string,
    message: string,
}

export interface TodoInterface extends NewTodoInterface{
    _id: string
    userId: Types.ObjectId,
    isDone: boolean,
    createdAt: Date,
    updatedAt: Date
}