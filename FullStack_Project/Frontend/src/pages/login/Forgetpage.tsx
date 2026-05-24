import { Box, Button, TextField, Typography } from "@mui/material"
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Link } from "react-router";

const Forget = () => {
    return (
        <>
            <Box className='forget-section'>
                <Box className='forget-box'>
                    <Box className='forget-box-1'>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 3, width: '25vw' }}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', marginTop: 5}}>Forget Password?</Typography>
                            <TextField
                                type="password"
                                label="New password"
                                variant="outlined"
                                color="success"/>
                            <TextField
                                type="password"
                                label="Confirm New password"
                                variant="outlined"
                                color="success"/>
                            <Button variant="contained" className="reset-button">Reset Password</Button>
                            <Link to='/login'>
                                <Button variant="text" className="back-login">
                                    <ArrowBack/>
                                    <Typography>Back to Log in</Typography>
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Forget