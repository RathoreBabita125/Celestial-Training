import Typography from '@mui/material/Typography'
import { Box, Stack } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import TaskIcon from '@mui/icons-material/Task';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Diversity3Icon from '@mui/icons-material/Diversity3';

const DashSidebar = () => {

    const { theme, setTheme, userAuth } = useContext(AuthContext);
    const themeColor = theme ? "darkMode" : "lightMode";

    return (
        <>
            <Box className={`sidebar ${themeColor}`}>
                <Stack direction={'column'} spacing={4} className={`sidebar-box ${themeColor}`}>
                    <Stack >
                        <Typography variant='h5' className="sidebar-typo" sx={{ fontWeight: 'bold' }}>ProjectHub</Typography>
                    </Stack>
                    <Link to='/dashboard' className={`dash-side-link ${themeColor}`}>
                        <Stack direction={'row'} spacing={2} className="sidebar-typo" sx={{ mt: 5 }}>
                            <DashboardRoundedIcon />
                            <Typography variant="body1">Dashboard</Typography>
                        </Stack>
                    </Link>
                    {
                        userAuth?.role === 'Admin' && (
                            <>
                                <Link to='/dashboard/user-management' className={`dash-side-link ${themeColor}`}>
                                    <Stack direction={'row'} spacing={2} className="sidebar-typo">
                                        <PersonIcon />
                                        <Typography variant="body1">User Management</Typography>
                                    </Stack>
                                </Link>

                                <Link to='/dashboard/project-management' className={`dash-side-link ${themeColor}`}>
                                    <Stack direction={'row'} spacing={2} className="sidebar-typo">
                                        <FolderIcon />
                                        <Typography variant="body1">Project Management</Typography>
                                    </Stack>
                                </Link>
                            </>
                        )
                    }

                    {
                        userAuth?.role === 'Project Manager' && (
                            <>
                                <Link to='/dashboard/projects' className={`dash-side-link ${themeColor}`}>
                                    <Stack direction={'row'} spacing={2} className="sidebar-typo">
                                       <FolderIcon />
                                        <Typography variant="body1">Projects</Typography>
                                    </Stack>
                                </Link>
                                <Link to='/dashboard/tasks' className={`dash-side-link ${themeColor}`}>
                                    <Stack direction={'row'} spacing={2} className="sidebar-typo">
                                        <TaskIcon />
                                        <Typography variant="body1">Tasks</Typography>
                                    </Stack>
                                </Link>
                                <Link to='/dashboard/teams' className={`dash-side-link ${themeColor}`}>
                                    <Stack direction={'row'} spacing={2} className="sidebar-typo">
                                        <Diversity3Icon />
                                        <Typography variant="body1">Teams</Typography>
                                    </Stack>
                                </Link>
                            </>
                        )
                    }
                    <Link to='/dashboard/calender' className={`dash-side-link ${themeColor}`}>
                        <Stack direction={'row'} spacing={2} className="sidebar-typo">
                            <CalendarMonthIcon />
                            <Typography variant="body1">Calender</Typography>
                        </Stack>
                    </Link>
                    <Stack direction={'row'} spacing={2} className="sidebar-typo" sx={{ alignItems: 'center' }}>
                        <Brightness4Icon />
                        <Typography variant="body1">Dark Mode</Typography>
                        <ToggleOffIcon sx={{ fontSize: '40px', cursor: "pointer" }} onClick={() => setTheme(!theme)} />
                    </Stack>
                </Stack>
                <Stack className='dash-user-show'>
                    <Typography variant="h6" color="initial" sx={{ fontWeight: 'semibold' }}>{userAuth?.fullName?.split(' ')[0]}</Typography>
                    <Typography variant="body1" color="initial" sx={{ color: 'gray' }}>{userAuth?.role}</Typography>
                </Stack>
            </Box>
        </>
    )
}
export default DashSidebar;