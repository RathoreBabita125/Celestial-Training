import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./Task.ts";

export enum UserStatus{
    ACTIVE="ACTIVE",
    INACTIVE="INACTIVE",
    BLOCKED="BLOCKED"
}

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'text'})
    fullName!:string;

    @Column({type:'text', unique:true})
    email!:string;

    @Column({type:'text'})
    password!:string;

    @Column({type:'text'})
    role!:string;

    @Column({type:'bigint'})
    phone!:number;

    @Column({
        type:'enum',
        enum:UserStatus,
        default:UserStatus.ACTIVE
    })
    status!:UserStatus;

    @CreateDateColumn()
    createdAt!:Date;

    @UpdateDateColumn()
    updatedAt!:Date;

    @DeleteDateColumn()
    deletedAt!:Date;

    @OneToMany(()=>Task, (task)=>task.assignedTo)
    tasks:Task[] | undefined
};