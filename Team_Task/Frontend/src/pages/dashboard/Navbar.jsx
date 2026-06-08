import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Dashboard.css';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LOGOUT } from "../../query/query";
import LogoutIcon from '@mui/icons-material/Logout';
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router";


const DashNavbar = () => {
    const { loginUserData } = useContext(AuthContext);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [logout]=useMutation(LOGOUT);
    const navigate=useNavigate();
    const {theme} = useContext(AuthContext)
    const themeColor=theme ? "darkMode" : "lightMode"; 

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogoutBTN = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.log(error);
        };
    };

    const handleDashboard=()=>{
        navigate("/dashboard");
    }

    return (
        <>
            <AppBar position='relative' className={`dashboard-navbar ${themeColor}`}>
                <Toolbar className='dashboard-toolbar'>
                    <Box className="dashboard-navbar-items" >
                        <Box className="dashboard-navbar-input">
                        </Box>
                        <Stack direction={'row'} spacing={12}>
                            <Box className={`dashboard-navbar-text`}>
                                <Button className={`${themeColor}`}>Feedback</Button>
                                <NotificationsIcon sx={{ cursor: 'pointer' }}  className={`${themeColor}`}/>
                            </Box>
                            <Tooltip>
                                <IconButton onClick={handleOpenUserMenu}>
                                    <Avatar className={`${themeColor}`}>
                                        {loginUserData?.fullName?.[0].toUpperCase()}
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    sx={{ mt: '55px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography sx={{ textAlign: 'center' }} onClick={handleDashboard}>Dashboard</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Box sx={{display:"flex", alignItems:"center", gap:1}}>
                                            <LogoutIcon fontSize="30px" />
                                            <Typography onClick={handleLogoutBTN}>Logout</Typography>
                                        </Box>
                                    </MenuItem>
                                </Menu>
                            </Tooltip>
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}
export default DashNavbar;