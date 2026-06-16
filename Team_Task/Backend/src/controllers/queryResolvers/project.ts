import { AppDataSource } from '../../../app';
import { Project } from '../../models/Project';

export const projectResolvers = {
    Query: {
        projects: async (_: any, projectData: any) => {
            const projectRepo = AppDataSource.getRepository(Project);
            const where: any = {}
            if (projectData.title) {
                where.title = projectData.title;
            }
            if (projectData.status) {
                where.status = projectData.status;
            }
            if (projectData.priority) {
                where.priority = projectData.priority;
            }
            if (projectData.projectManager) {
                where.projectManager = projectData.projectManager;
            }
            return await projectRepo.find({
                where,
                relations: {
                    tasks: true
                },
                order: {
                    createdAt: "DESC"
                }
            })
        },
        getProjectDetails: async () => {
            const projectRepo = AppDataSource.getRepository(Project);
            return await projectRepo.find({
                relations: {
                    tasks: true
                }
            })
        },
    }
}