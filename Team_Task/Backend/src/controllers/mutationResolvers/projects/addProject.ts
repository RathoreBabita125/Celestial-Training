import { AppDataSource } from "../../../../app";
import { validateProjectInput } from "../../../common/projectValidate";
import { Project } from "../../../models/Project";

export const addProjectResolvers = {
    Mutation: {
        createProject: async (_: any, projectData: any) => {
            const projectRepo = AppDataSource.getRepository(Project);
            const inputFields=["title", "description", "status", "priority"];
            validateProjectInput(projectData, inputFields);

            const project = await projectRepo.create({
                title: projectData.title,
                description: projectData.description,
                projectManager: projectData.projectManager,
                engineers: projectData.engineers,
                status: projectData.status,
                priority: projectData.priority,
                startDate: projectData.startDate,
                endDate: projectData.endDate,
            });
            return await projectRepo.save(project);
        },
    }
}