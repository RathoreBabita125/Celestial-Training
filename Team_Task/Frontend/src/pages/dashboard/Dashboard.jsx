import { Box, Stack } from "@mui/material";
import DashNavbar from "./Navbar";
import DashSidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <>
            <Stack direction={'row'}>
                {/* <DashSidebar/> */}
                <DashSidebar
                    mobileOpen={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                />
                <Box >
                    <Box className="dashboard-navbar-box">
                        {/* <DashNavbar /> */}
                        <DashNavbar onMenuClick={() => setMobileOpen(true)} />
                    </Box>
                    <Box className="dash-outlet" >
                        <Outlet />
                    </Box>
                </Box>
            </Stack>
        </>
    )
}
export default Dashboard;