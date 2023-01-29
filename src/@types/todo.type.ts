export interface NewTodoInterface {
    todo: string,
    message: string,
}

export interface TodoInterface extends NewTodoInterface{
    _id: string
    userId: string,
    isDone: boolean,
    createdAt: Date,
    updatedAt: Date
}