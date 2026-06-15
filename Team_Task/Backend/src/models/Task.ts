import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./Project.ts";
import { User } from "./User.ts";
import { Field } from "type-graphql";

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'text'})
    title!:string;

    @Column({type:'text'})
    description!:string;

    @Column()
    priority!:string;

    @Column()
    status!:string;

    @Column({type:'date'})
    dueDate!:Date;

    @Column({type:'date'})
    estimateDate!:Date

    @Field(() => User)
    @ManyToOne(()=>User, (user)=>user.tasks, {eager:true})
    assignedTo!:User;
    
    @Field(() => Project)
    @ManyToOne(()=>Project, (project)=>project.tasks, {eager:true})
    project!:Project;
};

