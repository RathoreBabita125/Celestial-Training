import { AppDataSource } from '../../../app';
import { Task } from '../../models/Task';

export const taskResolvers = {
    Query: {
        tasks: async (_:any, taskData:any) => {
            const taskRepo=AppDataSource.getRepository(Task)
            const where: any = {};

            // filter task data 
            if (taskData.title) {
                where.title = taskData.title;
            }
            if (taskData.status) {
                where.status = taskData.status;
            }
            if (taskData.priority) {
                where.priority = taskData.priority;
            }
            return await taskRepo.find({ where })
        },
    }
}
