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
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { Link } from "react-router";

const DashSidebar = () => {
    return (
        <>
            <Box className="sidebar">
                <Stack direction={'column'} spacing={4} className="sidebar-box">
                    <Stack direction={'row'} spacing={2} >
                        <Typography variant='h5' className="sidebar-typo" sx={{ fontWeight: 'bold' }}>Teamtask</Typography>
                    </Stack>
                    <Link to='/dashboard/dashhome' className="dash-side-link" >
                        <Stack direction={'row'} spacing={2} className="sidebar-typo" sx={{mt:5}}>
                            <DashboardRoundedIcon />
                            <Typography variant="body1">Dashboard</Typography>
                        </Stack>
                    </Link>
                    <Link to='/dashboard/inbox' className="dash-side-link">
                        <Stack direction={'row'} spacing={2} className="sidebar-typo">
                            <MailIcon />
                            <Typography variant="body1">Inbox</Typography>
                        </Stack>
                    </Link>
                    <Link to='/dashboard/project' className="dash-side-link">
                        <Stack direction={'row'} spacing={2} className="sidebar-typo">
                            <FolderIcon />
                            <Typography variant="body1">Project</Typography>
                            <KeyboardArrowDownIcon />
                        </Stack>
                    </Link>
                    <Link to='/dashboard/task' className="dash-side-link">
                        <Stack direction={'row'} spacing={2} className="sidebar-typo">
                            <TaskIcon />
                            <Typography variant="body1">Task</Typography>
                            <KeyboardArrowDownIcon />
                        </Stack>
                    </Link>
                    <Link to='/dashboard/calender' className="dash-side-link">
                        <Stack direction={'row'} spacing={2} className="sidebar-typo">
                            <CalendarMonthIcon />
                            <Typography variant="body1">Calender</Typography>
                        </Stack>
                    </Link>
                    <Link to='/dashboard/team' className="dash-side-link">
                        <Stack direction={'row'} spacing={2} className="sidebar-typo">
                            <GroupIcon />
                            <Typography variant="body1">Teams</Typography>
                        </Stack>
                    </Link>
                    <Link to='/dashboard/message' className="dash-side-link">
                        <Stack direction={'row'} spacing={2} className="sidebar-typo">
                            <MessageIcon />
                            <Typography variant="body1">Messages</Typography>
                        </Stack>
                    </Link>
                    <Link to='/dashboard/activity' className="dash-side-link">
                        <Stack direction={'row'} spacing={2} className="sidebar-typo">
                            <LocalActivityIcon />
                            <Typography variant="body1">Activity</Typography>
                        </Stack>
                    </Link>
                    <Stack direction={'row'} spacing={2} className="sidebar-typo" sx={{ alignItems: 'center' }}>
                        <Brightness4Icon />
                        <Typography variant="body1">Dark Mode</Typography>
                        <ToggleOffIcon sx={{ fontSize: '40px', cursor: "pointer" }} />
                    </Stack>
                </Stack>
                <Stack direction={'row'} spacing={2} className='logout-button'>
                    <LogoutIcon fontSize="30px" />
                    <Typography variant="h6">Logout</Typography>
                </Stack>
            </Box>
        </>
    )
}
export default DashSidebar