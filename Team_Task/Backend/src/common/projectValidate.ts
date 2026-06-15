export const validateProjectInput = (projectData: any, inputFields: string[]) => {

    //check title  valid
    if (inputFields.includes('title')) {
        if (!projectData.title || projectData.title.trim() === '')
            throw new Error("Project title is required");
    }

    //check description valid
    if (inputFields.includes('description')) {
        if (!projectData.description || projectData.description.trim() === '')
            throw new Error("Project description is required");
    }

    //check status valid
    if (inputFields.includes('status')) {
        if (!projectData.status || projectData.status.trim() === '')
            throw new Error("Project status is required");
    }

    //check priority valid
    if (inputFields.includes('priority')) {
        if (!projectData.priority || projectData.priority.trim() === '')
            throw new Error("Project priority is required");
    }
}
