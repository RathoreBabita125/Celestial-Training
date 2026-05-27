import { connection } from "./connection.js";

export const tableCreation=async()=>{
    await connection.query(`
        create table if not exists userProfile(
            fullName varchar(250),
            email varchar(250) unique not null,
            password varchar(250),
            role varchar(250)
            phone bigint,
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