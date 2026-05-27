import { connection } from "../../database/connection.js";
import bcrypt from 'bcrypt'

export const signupRoute=async(req, res)=>{
    try {  
        let data = req.body;
        const{fullName, email, password, confirmPassword, phone, address}=data;
        const userData=await connection.query(
            `select * from userProfile where email=$1`,[email])
            
        if(userData.rows.length>0){
            console.log('already existed\nYou can directly login');           
            return res.json({
                status:"You are already existed."
            })
        }

        const hashedPassword=await bcrypt.hash(password, 10)
    
        const insertedData=await connection.query(`
            insert into userProfile(fullName, email, password, phone, address)
            values($1, $2, $3, $4, $5)`, [fullName, email, hashedPassword, phone, address])
        
        console.log('you are successfully signed up');
        res.json({
            status:'Congratulations! you are successfully signed up.',
            data:insertedData.rows
        })
    } catch (error) {
        console.log(error);  
        res.json({
            status:"server error"
        })
    }
}