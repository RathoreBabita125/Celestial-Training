import { AppDataSource } from "../../../../app";
import { validateTaskInput } from "../../../common/taskValidate";
import { Project } from "../../../models/Project";
import { Task } from "../../../models/Task";
import { User } from "../../../models/User";

export const addTaskResolvers = {
    Mutation: {
        createTask: async (_: any, taskData: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const projectRepo = AppDataSource.getRepository(Project);
            const taskRepo = AppDataSource.getRepository(Task);

            const user = await userRepo.findOne({ where: { id: Number(taskData.assignedTo) } });
            const project = await projectRepo.findOne({ where: { id: Number(taskData.projectId) } });

            const inputFields=["title", "description", "status", "priority"];
            validateTaskInput(taskData, inputFields);

            if (!user || !project) {
                throw new Error("User or Project not found");
            }

            const task = taskRepo.create({
                title: taskData.title,
                description: taskData.description,
                status: taskData.status,
                priority: taskData.priority,
                assignedTo: user,
                project: project,
                dueDate: taskData.dueDate,
                estimateDate: taskData.estimateDate
            });
            return await taskRepo.save(task);
        },
    }
}
