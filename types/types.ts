import { Document } from "mongoose"

export interface User  {
    FullName:string
    Email:string
    Password:string
}
export interface IUser extends User,Document{}