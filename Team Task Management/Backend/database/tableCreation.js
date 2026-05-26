import { connection } from "./connection.js";

export const tableCreation=async()=>{
    await connection.query(`
        create table if not exists userProfile(
            fullName varchar(50),
            email varchar(100) unique not null,
            password varchar(50),
            phone bigint,
            address varchar(250)
        )`, (err)=>{
            if(!err){
                console.log('Table is created successfully.')
            }
        }
    )
    // await connection.query(`
    //     alter table userProfile 
    //     add constraint email unique (email)
    //     `, (err)=>{
    //         if(!err){
    //             console.log('The email column is updated.')
    //         }
    //     }
    // )
}