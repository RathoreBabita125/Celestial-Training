import { AppBar, Box, Button, Stack, Typography } from "@mui/material";

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
                        <Button>Todo</Button>
                        <Button>In progress</Button>
                        <Button>Completed</Button>
                    </Stack>
                </AppBar>

            </Box>
        </>
    )
}
export default Task;