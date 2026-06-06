import jwt from 'jsonwebtoken';

export const AuthMiddleware=(req:any, res:any)=>{
    const authHeader=req.headers.autherization;
    if(!authHeader){
        return null;
    }
    const token=authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY!);
    console.log(decoded); 
    return decoded;
};