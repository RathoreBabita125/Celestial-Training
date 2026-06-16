import { AppDataSource } from "../../../../app";
import { Project } from "../../../models/Project";
import { Task } from "../../../models/Task";

export const deleteProjectResolvers = {
    Mutation: {
        deleteProject: async (_: any, projectData: any) => {
            const projectRepo = AppDataSource.getRepository(Project);
            const taskRepo = AppDataSource.getRepository(Task);
            
            const project = await projectRepo.findOne({ where: { id: projectData.id } });
            if (!project) {
                throw new Error("Not Found Project");
            }
            await taskRepo.delete({project:{
                id:projectData.id
            }})
            await projectRepo.delete(project.id);
            return project;
        },
    }
}