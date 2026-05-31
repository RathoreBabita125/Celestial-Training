import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task.ts";

@Entity()
export class Project{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'text'})
    title!:string;

    @Column({type:'text'})
    description!:string;

    @Column({default:'pending'})
    status!:string;

    @OneToMany(()=>Task, (task)=>task.project)
    tasks:Task[] | undefined

}