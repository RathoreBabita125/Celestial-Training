import { AppBar, Avatar, Box, Button, IconButton, Stack, Toolbar, Tooltip} from "@mui/material";
import './Dashboard.css'

const Dashboard = () => {

    return (
        <>
            <AppBar position='fixed' className="dashboard-navbar">
                <Toolbar className='dashboard-toolbar'>
                    <Stack direction={'row'} spacing={2} >
                        <Button>Feedback</Button>
                        <Button>Changelog</Button>
                        <Button>Docs</Button>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar alt="profile" src="/src/assets/profile.jpg" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Stack>
                </Toolbar>

            </AppBar>
        </>
    )
}
export default Dashboard;