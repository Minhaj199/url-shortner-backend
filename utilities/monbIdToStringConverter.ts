import { Types } from "mongoose"


 export const idConverter=(id:unknown)=>{
    try {
        if(id instanceof Types.ObjectId){
            return id.toString()
        }else{
            throw new Error('id not found')
        }
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message)
        }else{
            throw new Error('internal server error')
        }
    }
 }