import { AppDataSource } from "../../../../app";
import { validateProjectInput } from "../../../common/projectValidate";
import { Project } from "../../../models/Project";

export const updateProjectResolvers = {
    Mutation: {
        updateProject: async (_: any, projectData: any) => {
            const projectRepo = AppDataSource.getRepository(Project);
            const project = await projectRepo.findOne({ where: { id: projectData.id } })
           
            const inputFields = [];
            if (projectData.title !== undefined) inputFields.push("title");
            if (projectData.description !== undefined) inputFields.push("description");
            if (projectData.status !== undefined) inputFields.push("status");
            if (projectData.priority !== undefined) inputFields.push("priority");

            if (inputFields.length > 0) {
                validateProjectInput(projectData, inputFields);
            }

            if (!project) {
                throw "Project is not found";
            }
            if (projectData.title != undefined) {
                project.title = projectData.title;
            }
            if (projectData.projectManager != undefined) {
                project.projectManager = projectData.projectManager;
            }
            if (projectData.engineers != undefined) {
                project.engineers = projectData.engineers;
            }
            if (projectData.description != undefined) {
                project.description = projectData.description;
            }
            if (projectData.status != undefined) {
                project.status = projectData.status;
            }
            if (projectData.priority != undefined) {
                project.priority = projectData.priority;
            }
            if (projectData.projectManagerId != undefined) {
                project.projectManagerId = projectData.projectManagerId;
            }
            return await projectRepo.save(project);
        },
    }
}