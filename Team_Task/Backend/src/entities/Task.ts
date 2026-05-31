import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./Project.ts";
import { User } from "./User.ts";

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'text'})
    title!:string;

    @Column({type:'text'})
    description!:string;

    @Column()
    status!:string;

    @ManyToOne(()=>User, (user)=>user.tasks)
    assignedTo:User | undefined;

    @ManyToOne(()=>Project, (project)=>project.tasks)
    project:Project | undefined
}