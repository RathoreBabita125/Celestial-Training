import jwt, { decode } from 'jsonwebtoken';

export const authMiddleware=(req, res, next)=>{

    const tokens =req.cookies.accessToke;
    console.log(tokens);
    
    if(!tokens){
        return res.json({status: "No token found"})
    }
    try {
        const decodedData=jwt.verify(tokens, 'private key');
        console.log(decodedData); 
        req.user=decodedData;
        // console.log(user); 
        next()
    } catch (error) {
        res.json({
            status:'invalid token'
        })
    }
}
