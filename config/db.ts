import mongoose from "mongoose";

export const dbConnection=async()=>{
    try {
        const connection=await mongoose.connect(process.env.DB_STRING as string)
        console.log(`DB connect:${connection.connection.host}`)
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
    process.exit(1); 
    }
}