import { connection } from '../../database/connection.js';

export const getUser=async(req, res)=>{
    const {email}=req.body
    const userData = await connection.query(`
        select * from userProfile where email=$1`,[email]
    )
    console.log(userData.rows[0]);
    return res.status(200).json({
        success:true,
        message:"data fetched successfully",
        data:userData.rows
    })
    
}