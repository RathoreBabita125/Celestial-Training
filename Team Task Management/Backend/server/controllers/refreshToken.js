import jwt, { decode } from 'jsonwebtoken';
import { connection } from '../../database/connection.js';


export const refreshTokenRoute=async(req, res)=>{

    console.log(req.cookies.token);
    

    if(req.cookies?.token){
        const refreshToken=req.cookies.token;
        const {name, email, password}=req.body
        const userData=await connection.query(`select * from userProfile where email=$1`,[email])
        
        jwt.verify(refreshToken, 'private key', (err, decode)=>{
            console.log(decode);
            
            if(!err){
                const accessToken = jwt.sign(
                    {
                        fullName:userData.rows[0].fullName,
                        email:userData.rows[0].email
                    },
                    'private key',
                    {
                        expiresIn:'10m'
                    }
                )
                // console.log(userData.rows);
                return res.json({accessToken})
            }else{
        return res.status(406).json({message:'Unauthorized'})
    }
        })
    }
    
}