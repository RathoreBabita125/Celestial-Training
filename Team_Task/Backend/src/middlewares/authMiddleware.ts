import jwt from 'jsonwebtoken';

export const AuthMiddleware=(req:any, res:any)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return {decoded:null, token:null};
        }
        const decoded=jwt.verify(token, process.env.PRIVATE_KEY!);
        req.user=decoded;
        return { 
            decoded,
            token
        }
    } catch (error) {
        return {decoded:null, token:null};
    }
};

