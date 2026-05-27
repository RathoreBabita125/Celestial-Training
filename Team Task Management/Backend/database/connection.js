import {Client} from 'pg'
import { tableCreation } from './userData.js';

export const connection=new Client({
    host:'localhost',
    user:'postgres',
    password:'Cel%Bd@2026',
    port:5432,
    database:'Task_Team'
})

connection.connect()
.then(()=>{
    console.log('Postgres database is connected successfully');
    tableCreation()      
})
.catch((err)=>{
    console.log('Connection failed', err)
})