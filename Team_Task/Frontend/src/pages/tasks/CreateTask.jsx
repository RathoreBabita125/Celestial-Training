import { useMutation } from '@apollo/client/react';
import { Button, Stack, TextareaAutosize, TextField } from '@mui/material';
import Typography from '@mui/material/Typography'
import { useState } from 'react';
import { CREATETASK } from '../../query/query';

const CreateTask = () => {
    const [task, setTask] = useState({
        userId:'',
        projectId:'',
        title: '',
        description: '',
        status: '',
    });
    const [error, setError] = useState({
        userId:'',
        projectId:'',
        title: '',
        description: '',
        status: '',
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [createTask] = useMutation(CREATETASK);


    const validateProjectInputs = () => {
        const newError = {};
        if (!task.userId || task.userId.trim() === "") {
            newError.userId = "This field is required.";
        }
        if (!task.projectId || task.projectId.trim() === "") {
            newError.projectId = "This field is required.";
        }
        if (!task.title || task.title.trim() === "") {
            newError.title = "Title field is required.";
        }
        if (!task.description || task.description.trim() === "") {
            newError.description = "Description field is required.";
        }
        if (!task.status || task.status.trim() === "") {
            newError.status = "Status field is required";
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const handleTaskInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setTask((preTask) => ({ ...preTask, [name]: value }));
    }

    const handleTaskCreation = async() => {
        const validateInputs = validateProjectInputs();
        if (!validateInputs) {
            throw new Error("Please enter required details");
        }
        try {
            const response = await createTask({
                variables: {
                    userId:task.userId,
                    projectId:task.projectId,
                    title: task.title,
                    description: task.description,
                    status: task.status
                }
            });
            console.log(response);            
            if (response) {
                setSuccessMessage("You have sucessfully created task");
                setTask({
                    userId:'',
                    projectId:'',
                    title: '',
                    description: '',
                    status: '',
                });
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Stack spacing={3} direction={'column'} className='dash-task-creation'>
                <Stack direction={'column'} spacing={3}>            
                    <TextField
                        className='task-textfield'
                        id="userId"
                        name='userId'
                        error={error.userId}
                        helperText={error ? error.userId : ''}
                        label="Enter user Id"
                        value={task.userId}
                        onChange={handleTaskInputs}
                        variant='outlined'
                    />
                    <TextField
                        className='task-textfield'
                        id="projectId"
                        name='projectId'
                        error={error.projectId}
                        helperText={error ? error.projectId : ''}
                        label="Enter project Id"
                        value={task.projectId}
                        onChange={handleTaskInputs}
                        variant='outlined'
                    />
                    <TextField
                        className='task-textfield'
                        id="title"
                        name='title'
                        error={error.title}
                        helperText={error ? error.title : ''}
                        label="Enter the title of task"
                        value={task.title}
                        onChange={handleTaskInputs}
                        variant='outlined'
                    />
                    <TextareaAutosize
                        className='task-textfield'
                        id="description"
                        name='description'
                        error={error.description}
                        helperText={error ? error.description : ''}
                        aria-label="Project Description"
                        value={task.description}
                        onChange={handleTaskInputs}
                        minRows={5}
                        placeholder="task Description"
                        style={{ width: 300 }}
                    />
                    <TextField
                        className='task-textfield'
                        id="status"
                        name='status'
                        error={error.status}
                        helperText={error ? error.status : ''}
                        label="Enter the status of task"
                        value={task.status}
                        onChange={handleTaskInputs}
                        variant='outlined'
                    />
                </Stack>
                <Button className='project-btn' onClick={handleTaskCreation}>Create Task</Button>
                {<Typography variant="h6" sx={{ marginTop: 2 }}>{successMessage} </Typography>}
            </Stack>
        </>
    )
}
export default CreateTask;