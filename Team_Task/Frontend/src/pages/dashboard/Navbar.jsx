import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Dashboard.css';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { settings } from "../../constants/const";

const DashNavbar = () => {
    const { loginUserData } = useContext(AuthContext);

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position='relative' className="dashboard-navbar">
                <Toolbar className='dashboard-toolbar'>
                    <Box className="dashboard-navbar-items" >
                        <Box className="dashboard-navbar-input">
                        </Box>
                        <Stack direction={'row'} spacing={12}>
                            <Box className="dashboard-navbar-text">
                                <Button>Feedback</Button>
                                <NotificationsIcon sx={{ cursor: 'pointer', color: '#053348' }} />
                            </Box>
                            <Tooltip title="Open settings">
                                <IconButton >
                                    <Avatar sx={{ backgroundColor: '#053348', color: 'white' }}>
                                        {loginUserData?.fullName?.[0].toUpperCase()}
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    sx={{ mt: '45px' }}
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
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                        </MenuItem>
                                    ))}
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