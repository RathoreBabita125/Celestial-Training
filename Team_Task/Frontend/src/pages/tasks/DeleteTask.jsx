import { useMutation } from '@apollo/client/react';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography'
import { useState } from 'react';
import { DELETETASK } from '../../query/query';

const DeleteTask = () => {
    const [deleteID, setDeleteID]=useState("");
    const [successMessage, setSuccessMessage]=useState("");
    const [deleteTask]=useMutation(DELETETASK);
    
    const handleDeleteTask=async()=>{
        try {
            const response=await deleteTask({
               variables:{
                id:deleteID
               }
            });
            console.log(response);
            if(response){
                setSuccessMessage("Task has been successfully deleted.")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Box className="dash-task-delete">
                <Stack spacing={4}>
                    <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Delete Existing Task</Typography>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        <Grid item>
                            <TextField
                                type='number'
                                name='id'
                                label="Enter the project id"
                                value={deleteID}
                                onChange={(event) => setDeleteID(event.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <Button onClick={handleDeleteTask}>Delete Task</Button>
                        </Grid>
                    </Grid>
                    {<Typography variant="h6" sx={{ marginTop: 2 }}>{successMessage} </Typography>}
                </Stack>
            </Box>
        </>
    )
}
export default DeleteTask;