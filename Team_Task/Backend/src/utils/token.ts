import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const PRIVATE_KEY=process.env.PRIVATE_KEY;
export const generateTokens=(user:any)=>{
    return jwt.sign(
        {
            id:user.id, 
            role:user.role
        },
        PRIVATE_KEY!,{
        expiresIn:"1d"
    }); 
};