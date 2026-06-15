import { AppDataSource } from "../../../../app";
import { validateTaskInput } from "../../../common/taskValidate";
import { Task } from "../../../models/Task";

export const updateTaskResolvers = {
    Mutation: {
        updateTask: async (_: any, taskData: any) => {
            const inputFields=["title", "description", "status", "priority", "projectId", "assignedTo"];
            validateTaskInput(taskData, inputFields);

            if (!taskData.id) {
                throw new Error("Task id is required");
            }
            const taskRepo = AppDataSource.getRepository(Task);
            const task = await taskRepo.findOne({
                where: { id: taskData.id },
                relations: {
                    assignedTo: true,
                    project: true,
                },
            });

            if (!task) {
                throw new Error("Task Not Found");
            }
            if (taskData.title !== undefined) {
                task.title = taskData.title;
            }
            if (taskData.description !== undefined) {
                task.description = taskData.description;
            }
            if (taskData.status !== undefined) {
                task.status = taskData.status;
            }
            if (taskData.priority !== undefined) {
                task.priority = taskData.priority;
            }
            if (taskData.assignedTo !== undefined) {
                task.assignedTo = taskData.assignedTo;
            }
            if (taskData.projectId !== undefined) {
                task.project = taskData.projectId;
            }
            if (taskData.dueDate !== undefined) {
                task.dueDate = taskData.dueDate;
            }
            if (taskData.estimateDate !== undefined) {
                task.estimateDate = taskData.estimateDate;
            }
            await taskRepo.save(task);
            const updatedTask = await taskRepo.findOne({
                where: { id: task.id },
                relations: {
                    assignedTo: true,
                    project: true,
                },
            });
            return updatedTask;
        },
    }
}