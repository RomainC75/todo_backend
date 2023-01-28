export interface NewTodoInterface {
    todo: string,
    message: string,
}

export interface TodoInterface extends NewTodoInterface{
    userId: string,
    isDone: boolean
}