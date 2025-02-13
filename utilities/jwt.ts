import jwt from 'jsonwebtoken'
export function createToken(id:string,email:string,name:string){
    try {
       const token:string= jwt.sign({id,email:email,name},process.env.JEW_KEY as string,{expiresIn:'1h'})
        return token
    } catch (error:unknown) {
        if(error instanceof Error){
            throw new Error(error.message)
        }
    }
}