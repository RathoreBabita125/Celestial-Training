import { AppDataSource } from "../../../../app";
import { validateProjectInput } from "../../../common/projectValidate";
import { Project } from "../../../models/Project";

export const updateProjectResolvers = {
    Mutation: {
        updateProject: async (_: any, projectData: any) => {
            const projectRepo = AppDataSource.getRepository(Project);
            const project = await projectRepo.findOne({ where: { id: projectData.id } })
            const inputFields=["title", "description", "status", "priority"];
            validateProjectInput(projectData, inputFields);

            if (!project) {
                throw "Project is not found";
            }
            if (projectData.title != undefined) {
                project.title = projectData.title;
            }
            if (projectData.discription != undefined) {
                project.description = projectData.description;
            }
            if (projectData.status != undefined) {
                project.status = projectData.status;
            }
            if (projectData.priority != undefined) {
                project.priority = projectData.priority;
            }
            return await projectRepo.save(project);
        },
    }
}