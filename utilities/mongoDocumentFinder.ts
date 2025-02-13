import { userModel } from "../model/userModel.js";

export const findDocumentByEmail=async(email:unknown)=>{
    try {
        if(typeof email !=='string'){
            throw new Error('email not found')
        }
        const doc=await userModel.findOne({Email:email})
        return doc
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message)
        }
        throw new Error('internal server error')
    }
}