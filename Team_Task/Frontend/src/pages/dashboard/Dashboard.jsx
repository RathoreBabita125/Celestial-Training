import { Box, Stack } from "@mui/material"
import DashNavbar from "./Navbar"
import DashSidebar from "./Sidebar"
import { Outlet } from "react-router-dom"


const Dashboard = () => {
    return (
        <>
            <Stack direction={'row'}>
                <DashSidebar/>
                <Box >
                    <Box className="dashboard-navbar-box">
                        <DashNavbar />
                    </Box>
                    <Box className="dash-outlet">
                        <Outlet/>  
                    </Box>
                </Box>
            </Stack>
        </>
    )
}

export default Dashboard