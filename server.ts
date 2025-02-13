import express, { NextFunction, Request,Response } from 'express'

import 'dotenv/config'
import morgan from 'morgan'
import router from './routes/router.js'
import { dbConnection } from './config/db.js'

const app=express()
app.use(morgan('dev'))
app.use(express.urlencoded())
app.use(express.json())

dbConnection()
app.get('/',(req,res)=>{
    res.json({"message":'success'})
})
app.use('/api',router)

app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
})

app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
    console.log(error)
    if(error instanceof Error&&'code' in error&&error['code']===11000){
        res.status(400).json({error:'email already exist'})
    }
    res.status(500).json({error:'internal server error'})
    next()
})