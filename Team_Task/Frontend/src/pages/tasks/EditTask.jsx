import { useMutation, useQuery } from '@apollo/client/react';
import { Button, Grid, Stack, TextareaAutosize, TextField } from '@mui/material';
import Typography from '@mui/material/Typography'
import { useState } from 'react';
import { GETTASKS, UPDATETASK } from '../../query/query';

const EditTask = () => {

    const [taskID, setTaskID]=useState('');
    const [editTasks, setEditTasks]=useState({});
    const{data}=useQuery(GETTASKS);
    const [updateTask] = useMutation(UPDATETASK); 

    const handleEditBTN=(event)=>{
        const name=event.target.name
        const value=event.target.value
        setEditTasks((preTask)=>({...preTask, [name]:value}))
    }

    const handleEditTaskBTN=()=>{
        try {
            const id = taskID
            data.tasks.filter((currProject) => {
                if (currProject.id === id) {
                    setEditTasks((preData) => ({ ...preData, id: currProject.id, title: currProject.title, description: currProject.description, status: currProject.status }))
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleSaveTaskBTN=async () => {
        try {
            const response = await updateTask({
                variables: {    
                    id: editTasks.id,
                    userId:editTasks.user.id,
                    projectId:editTasks.project.id,
                    title: editTasks.title,
                    description: editTasks.description,
                    status: editTasks.status
                }
            });
            console.log(response)
            editTasks({
                title: "",
                description: "",
                status: ""
            });
            setTaskID("");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Stack direction={'column'} spacing={5} className='dash-edit-task'>
                <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Edit Existing Task</Typography>
                <Stack spacing={3} direction={'column'} className='dash-project-edit'>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        <Grid item>
                            <TextField
                                type='number'
                                name='id'
                                label="Enter the task id"
                                value={taskID}
                                onChange={(event) => setTaskID(event.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <Button onClick={handleEditTaskBTN}>Edit Task</Button>
                        </Grid>
                    </Grid>
                    <Stack direction={'row'} spacing={5}>
                        <TextField
                            className='project-textfield'
                            id="title"
                            name='title'
                            value={editTasks.title}
                            onChange={handleEditBTN}
                            placeholder='Project Title'
                            variant='outlined'
                        />
                        <TextareaAutosize
                            className='project-textfield'
                            id="description"
                            name='description'
                            value={editTasks.description}
                            onChange={handleEditBTN}
                            minRows={5}
                            placeholder="Project Description"
                            style={{ width: 300 }}
                        />
                        <TextField
                            className='project-textfield'
                            id="status"
                            name='status'
                            value={editTasks.status}
                            onChange={handleEditBTN}
                            placeholder='Project Status'
                            variant='outlined'
                        />
                    </Stack>
                       <Stack direction={'column'} spacing={2}>
                            <TextField
                                className='project-textfield'
                                id="userId"
                                name='userId'
                                value={editTasks.userId}
                                onChange={handleEditBTN}
                                placeholder='User Id'
                                variant='outlined'
                            />
                            <TextField
                                className='project-textfield'
                                id="projectId"
                                name='projectId'
                                value={editTasks.projectId}
                                onChange={handleEditBTN}
                                placeholder='Project Id'
                                variant='outlined'
                            />
                       </Stack>
                    <Button onClick={handleSaveTaskBTN}>Save Task</Button>
                </Stack>
            </Stack>
        </>
    )
}
export default EditTask;