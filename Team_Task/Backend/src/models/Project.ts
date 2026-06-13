import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task.ts";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    title!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'text' })
    projectManager!: string;

    @Column({ type: 'text', array:true })
    engineers!: [string];

    @Column({ default: 'pending' })
    status!: string;

    @Column({ default: 'low' })
    priority!: string;

    @Column({ type: 'date' })
    startDate!: Date

    @Column({ type: 'date' })
    endDate!: Date

    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[] | undefined;
};