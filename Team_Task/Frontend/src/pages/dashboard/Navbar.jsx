// import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import './Dashboard.css';
// import { useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import LogoutIcon from '@mui/icons-material/Logout';
// import { useMutation } from "@apollo/client/react";
// import { useNavigate } from "react-router";
// import { useApolloClient } from "@apollo/client/react";
// import ProfileModal from "../../common/ProfileModal";
// import { LOGOUT } from "../../query/loginQuery/Logout";

// const DashNavbar = () => {

//     const { userAuth } = useContext(AuthContext);
//     const [userProfile, setUserProfile] = useState(null);
//     const [openProfile, setOpenProfile] = useState(false);
//     const [logout] = useMutation(LOGOUT);
//     const navigate = useNavigate();
//     const { theme } = useContext(AuthContext);
//     const client=useApolloClient();

//     const themeColor = theme ? "darkMode" : "lightMode";

//     const handleOpenUserMenu = (event) => {
//         setUserProfile(event.currentTarget);
//     };
//     const handleCloseUserMenu = () => {
//         setUserProfile(null);
//     };

//     const handleLogoutBTN = async () => {
//         try {
//             console.log("logout");
//             await logout();
//             await client.resetStore();
//             navigate('/signin', {replace:true});
//         } catch (error) {
//             navigate('/signin', {replace:true});
//             console.log(error);  
//         };
//     };

//     //handle close modal
//     const handleCloseProfile = () => {
//         setOpenProfile(false)
//     }
//     const handleDashboard = () => {
//         navigate("/dashboard");
//     }

//     return (
//         <>
//             <AppBar position='relative' className={`dashboard-navbar`}>
//                 <Toolbar className='dashboard-toolbar'>
//                     <Box className="dashboard-navbar-items" >
//                         <Box className="dashboard-navbar-input">
//                         </Box>
//                         <Stack direction={'row'} spacing={12}>
//                             <Box className={`dashboard-navbar-text`}>
//                                 <Button >Feedback</Button>
//                                 <NotificationsIcon sx={{ cursor: 'pointer' }} />
//                             </Box>
//                             <Tooltip>
//                                 <IconButton onClick={handleOpenUserMenu}>
//                                     <Avatar sx={{ backgroundColor: '#053348', color: 'white' }}>
//                                         {userAuth?.fullName?.[0].toUpperCase()}
//                                     </Avatar>
//                                 </IconButton>
//                                 <Menu
//                                     sx={{ mt: '55px' }}
//                                     id="menu-appbar"
//                                     userProfile={userProfile}
//                                     anchorOrigin={{
//                                         vertical: 'top',
//                                         horizontal: 'right',
//                                     }}
//                                     keepMounted
//                                     transformOrigin={{
//                                         vertical: 'top',
//                                         horizontal: 'right',
//                                     }}
//                                     open={Boolean(userProfile)}
//                                     onClose={handleCloseUserMenu}
//                                 >
//                                     <MenuItem>
//                                         <Typography sx={{ textAlign: 'center' }} onClick={()=>setOpenProfile(true)}>Profile</Typography>
//                                     </MenuItem>
//                                     <MenuItem>
//                                         <Typography sx={{ textAlign: 'center' }} onClick={handleDashboard}>Dashboard</Typography>
//                                     </MenuItem>
//                                     <MenuItem>
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                             <LogoutIcon fontSize="30px" />
//                                             <Typography onClick={handleLogoutBTN}>Logout</Typography>
//                                         </Box>
//                                     </MenuItem>
//                                 </Menu>
//                             </Tooltip>
//                             <ProfileModal
//                                 open={openProfile}
//                                 onClose={handleCloseProfile}
//                                 setOpenProfile={setOpenProfile}
//                             />
//                         </Stack>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//         </>
//     )
// }
// export default DashNavbar;


import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import './Dashboard.css';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router";
import { useApolloClient } from "@apollo/client/react";
import ProfileModal from "../../common/ProfileModal";
import { LOGOUT } from "../../query/loginQuery/Logout";

const DashNavbar = ({ onMenuClick }) => {
    const { userAuth } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState(null);
    const [openProfile, setOpenProfile] = useState(false);
    const [logout] = useMutation(LOGOUT);
    const navigate = useNavigate();
    const { theme } = useContext(AuthContext);
    const client = useApolloClient();
    const themeColor = theme ? "darkMode" : "lightMode";

    const handleOpenUserMenu = (event) => {
        setUserProfile(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setUserProfile(null);
    };

    const handleLogoutBTN = async () => {
        try {
            await logout();
            await client.resetStore();
            navigate('/signin', { replace: true });
        } catch (error) {
            navigate('/signin', { replace: true });
            console.log(error);
        }
    };

    const handleCloseProfile = () => {
        setOpenProfile(false);
    };

    const handleDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <>
            <AppBar position='relative' className={`dashboard-navbar`}>
                <Toolbar className='dashboard-toolbar'>
                    <Box className="dashboard-navbar-items">
                        <Box className="dashboard-navbar-input">
                            {/* Hamburger — only visible below 768px */}
                            <IconButton
                                className="hamburger-btn"
                                onClick={onMenuClick}
                                sx={{ display: { xs: 'flex', md: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Stack direction={'row'} spacing={{ xs: 2, sm: 4, md: 12 }}>
                            <Box className={`dashboard-navbar-text`}>
                                <Button>Feedback</Button>
                                <NotificationsIcon sx={{ cursor: 'pointer' }} />
                            </Box>
                            <Tooltip>
                                <IconButton onClick={handleOpenUserMenu}>
                                    <Avatar sx={{ backgroundColor: '#053348', color: 'white' }}>
                                        {userAuth?.fullName?.[0].toUpperCase()}
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    sx={{ mt: '55px' }}
                                    id="menu-appbar"
                                    userProfile={userProfile}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    keepMounted
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={Boolean(userProfile)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem>
                                        <Typography sx={{ textAlign: 'center' }} onClick={() => setOpenProfile(true)}>Profile</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <Typography sx={{ textAlign: 'center' }} onClick={handleDashboard}>Dashboard</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <LogoutIcon fontSize="30px" />
                                            <Typography onClick={handleLogoutBTN}>Logout</Typography>
                                        </Box>
                                    </MenuItem>
                                </Menu>
                            </Tooltip>
                            <ProfileModal
                                open={openProfile}
                                onClose={handleCloseProfile}
                                setOpenProfile={setOpenProfile}
                            />
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default DashNavbar;