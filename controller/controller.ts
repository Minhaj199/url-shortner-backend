import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../types/types.js";
import { userModel } from "../model/userModel.js";
import { createToken } from "../utilities/jwt.js";
import { idConverter } from "../utilities/monbIdToStringConverter.js";
import { findDocumentByEmail } from "../utilities/mongoDocumentFinder.js";
import { passwordComparing } from "../utilities/bcrypt.js";

export default {
    register:async (req:Request,res:Response,next:NextFunction)=>{
       
        const {name,email,password}=req.body
       
        try {
            if(!name||!email||!password){
                throw new Error('in sufficient data')
            }
            const data:User={
                FullName:name,
                Password:password,
                Email:email
            }
                const newUser=new userModel(data)
                const mongoDoc:IUser=await newUser.save()
                const docId=idConverter(mongoDoc._id)
                
                   const token= createToken(docId,mongoDoc.Email,mongoDoc.FullName)
                    res.json({"status":'Registration successfull',token})
                
                
               
        } catch (error:unknown) {
            if(error instanceof Error){
                next(error)
            }
        }
       
    },
    login:async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {email,password}=req.body
            if(!email||!password){
                throw new Error('in sufficient data')
            }
            const mongodoc=await findDocumentByEmail(email)
            if(mongodoc){
                const isValidPassoword=await passwordComparing(password,mongodoc.Password)
                if(isValidPassoword){
                    const docId=idConverter(mongodoc._id)
                    const token=createToken(docId,mongodoc.Email,mongodoc.FullName)
                    res.json({status:'login successfull',token})
                }else{
                    res.status(400).json({'message':'password not matching'})
                }
            }else{
                res.status(400).json({'message':'user not found'})
            }
        } catch (error) {
            next(error)
        }
    }
    
}