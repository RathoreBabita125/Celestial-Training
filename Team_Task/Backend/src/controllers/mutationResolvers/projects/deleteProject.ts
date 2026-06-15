import { AppDataSource } from "../../../../app";
import { Project } from "../../../models/Project";

export const deleteProjectResolvers = {
    Mutation: {
        deleteProject: async (_: any, projectData: any) => {
            const projectRepo = AppDataSource.getRepository(Project);
            const project = await projectRepo.findOne({ where: { id: projectData.id } });
            if (!project) {
                throw new Error("Not Found Project");
            }
            await projectRepo.delete(project.id);
            return project;
        },
    }
}