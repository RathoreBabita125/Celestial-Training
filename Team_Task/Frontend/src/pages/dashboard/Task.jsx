import { AppBar, Box, Button, Stack, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";


const Task = () => {
    return (
        <>
            <Box className='task-section'>
                <Stack spacing={1}>
                    <Typography variant="h4" color="initial" sx={{ fontWeight: 'bold' }}>Tasks List</Typography>
                    <Typography variant="body1"> Here is a list of projects that you have created</Typography>
                </Stack>
                <AppBar className='task-status'>
                    <Stack spacing={10} direction={'row'}>
                        <Link to='/dashboard/task/createtask'><Button>Create Task</Button></Link>
                        <Link to='/dashboard/task/deletetask'><Button>Delete Task</Button></Link>
                        <Link to='/dashboard/task/edittask'><Button>Edit Task</Button></Link>
                        <Link to='/dashboard/task/viewtask'><Button>View Task</Button></Link> 
                    </Stack>
                </AppBar>
                <Box sx={{marginTop:10}}>
                    <Outlet/>
                </Box>
            </Box>
        </>
    )
}
export default Task;