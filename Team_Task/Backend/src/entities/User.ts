import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task.ts";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id!:number

    @Column({type:'text'})
    fullName!:string

    @Column({type:'text', unique:true})
    email!:string

    @Column({type:'text'})
    password!:string

    @Column({type:'text'})
    role!:string

    @Column({type:'bigint'})
    phone!:number

    @OneToMany(()=>Task, (task)=>task.assignedTo)
    tasks:Task[] | undefined

}