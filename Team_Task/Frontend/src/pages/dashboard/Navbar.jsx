import { AppBar, Avatar, Box, Button, IconButton, Stack, TextField, Toolbar, Tooltip} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Dashboard.css'

const DashNavbar = () => {
    return (
        <>
            <AppBar position='relative' className="dashboard-navbar">
                <Toolbar className='dashboard-toolbar'>
                    <Box className="dashboard-navbar-items" >
                        <Box className="dashboard-navbar-input">
                            <TextField size="small" color="success"/>
                        </Box>
                        <Stack direction={'row'}  spacing={12}>
                            <Box className="dashboard-navbar-text">
                                <Button>Feedback</Button>
                                <NotificationsIcon sx={{cursor:'pointer', color:'#053348'}}/>
                            </Box>
                            <Tooltip title="Open settings">
                                <IconButton >
                                    <Avatar alt="profile" src="/src/assets/profile.jpg" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Box>
                </Toolbar>

            </AppBar>
        </>
    )
}
export default DashNavbar;