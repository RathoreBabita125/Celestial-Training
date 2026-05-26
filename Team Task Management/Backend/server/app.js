import express from 'express';
import cors from "cors";
import { connection } from '../database/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const app=express();
const PORT=5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.post('/signup', async(req, res)=>{

    try {      
        let data = req.body;
        const{fullName, email, password, confirmPassword, phone, address}=data;
    
        const userData=await connection.query(
            `select * from userProfile where email=$1`,[email])
            
        if(userData.rows.length>0){
            return res.json({
                status:"You are already existed"
            })
        }
    
        const hashedPassword=bcrypt.hash(password, 10)
    
        await connection.query(`
            insert into userProfile(fullName, email, password, phone, address)
            values($1, $2, $3, $4, $5)`, [fullName, email, hashedPassword, phone, address])

        res.jsonp({
            status:'Congratulations! you are successfully signed up.'
        })

    } catch (error) {
        console.log(error);  
        res.json({
            status:"server error"
        })
    }

})

app.post('/login', async(req, res)=>{
    // console.log(req.body)

    try {
        const {name, email, password}=req.body
        const userData=await connection.query(`
            select * from userProfile
        `)

        if(userData.rows.length===0){
            return res.json({
                status:'Invalid credential'
            })
        }

        const isAlreadyUser=await bcrypt.compare(password, userData.rows[0].password)

        if(!isAlreadyUser){
            return res.json({
                status:'Invalid email and password'
            })
        }

        const token=jwt.sign(
            {
                email:userData.rows[0].email,
                password:userData.rows[0].password
            }, 
            'private_key',
            {
                expiresIn:'2d'
            }
        )
        return res.json({
            status:'Login successfully'
        }, token)
        
    } catch (error) {
        res.json({
            status:`something wrong ${error}`
        })
    }
})

app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`);
})
