export interface NewUserInterface{
    email: string,
    password: string
}

export interface UserInterface extends NewUserInterface{
    _id:string
    createdAt: Date,
    updatedAt: Date
}