import { Box, Stack, Typography } from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';
import FolderIcon from '@mui/icons-material/Folder';
import TaskIcon from '@mui/icons-material/Task';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Sidebar = () => {
    return (
        <>
            <Box className="sidebar">
                <Stack direction={'column'} spacing={4} className="sidebar-box">
                    <Stack direction={'row'} spacing={2} >
                        <Typography variant='h5' className="sidebar-typo" sx={{fontWeight:'bold'}}>Teamtask</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2} className="sidebar-typo">
                        <MailIcon />
                        <Typography variant="body1">Inbox</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2} className="sidebar-typo">
                        <FolderIcon />
                        <Typography variant="body1">Project</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2} className="sidebar-typo">
                        <TaskIcon />
                        <Typography variant="body1">Task</Typography>
                        <KeyboardArrowDownIcon/>

                    </Stack>
                    <Stack direction={'row'} spacing={2} className="sidebar-typo">
                        <CalendarMonthIcon />
                        <Typography variant="body1">Calender</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2} className="sidebar-typo">
                        <GroupIcon />
                        <Typography variant="body1">Teams</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2} className="sidebar-typo">
                        <MessageIcon />
                        <Typography variant="body1">Messages</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2} className="sidebar-typo">
                        <LocalActivityIcon />
                        <Typography variant="body1">Activity</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2} className="sidebar-typo" sx={{ alignItems:'center'}}>
                        <Brightness4Icon />
                        <Typography variant="body1">Dark Mode</Typography>
                        <ToggleOffIcon sx={{fontSize:'40px', cursor:"pointer"}}/>
                    </Stack>
                </Stack>                
                <Stack direction={'row'} spacing={2} className='logout-button'>
                    <LogoutIcon fontSize="30px"/>
                    <Typography variant="h6">Logout</Typography>
                </Stack>
            </Box>
        </>
    )
}
export default Sidebar