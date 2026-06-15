export const validateTaskInput = (projectData: any, inputFields: string[]) => {

    //check title  valid
    if (inputFields.includes('title')) {
        if (!projectData.title || projectData.title.trim() === '')
            throw new Error('Please enter task name.');
    }

    //check description valid
    if (inputFields.includes('description')) {
        if (!projectData.description || projectData.description.trim() === '')
            throw new Error('Please enter task description.');
    }

    //check status valid
    if (inputFields.includes('status')) {
        if (!projectData.status || projectData.status.trim() === '')
            throw new Error('Please provide the status of the task.');
    }

    //check priority valid
    if (inputFields.includes('priority')) {
        if (!projectData.priority || projectData.priority.trim() === '')
            throw new Error('Please provide the priority of the task.');
    }

    //check projectId valid
    if (inputFields.includes('projectId')) {
        if (!projectData.projectId)
           throw new Error('Please provide project id for the task');
    }

    //check assignedTo valid
    if (inputFields.includes('assignedTo')) {
        if (!projectData.assignedTo)
            throw new Error('Please provide user id for the task');
    }
}

