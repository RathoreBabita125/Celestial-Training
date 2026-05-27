import express from 'express';
import cors from "cors";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {signupRoute} from './controllers/signup.js'
import {loginRoute } from './controllers/login.js';
import cookieParser from "cookie-parser"
import { authMiddleware } from './middlewares/authMiddleware.js';
import { getUser } from './controllers/getUser.js';
import  {refreshTokenRoute}  from './controllers/refreshToken.js';
import { logoutRoute } from './controllers/logout.js';
import router from './routes/userRoute.js';


const app=express();
const PORT=5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use("/api/auth/",router)



app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`);
})
