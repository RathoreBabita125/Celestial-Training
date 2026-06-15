import { AppDataSource } from "../../../../app";
import { Task } from "../../../models/Task";

export const deleteTaskResolvers = {
    Mutation: {
        deleteTask: async (_: any, taskData: any) => {
            const taskRepo = AppDataSource.getRepository(Task);
            const task = await taskRepo.findOne({ where: { id: taskData.id } });
            if (!task) {
                throw new Error("Task does not Exist");
            }
            const deletedTask = { ...task };
            await taskRepo.remove(task);
            return deletedTask;
        },
    }
}