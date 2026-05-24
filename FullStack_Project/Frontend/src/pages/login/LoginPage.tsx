import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import './login.css'
import { Link } from "react-router";

const Login = () => {
    return (
        <>
            <Box className="login-section">
                <Box className='login-box'>
                    <Box className='login-box-1'>
                        <Stack direction={"row"} spacing={2} className="login-right-top-button">
                            <Link to='/login'><Button sx={{color:'#053348'}}>Login</Button></Link>
                            <Link to='/register'><Button variant="contained" sx={{ backgroundColor: '#053348' }}>Sign up</Button></Link>
                        </Stack>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Login</Typography>
                        <Box className='login-form-box'>
                            <TextField
                                type="email"
                                label="Email"
                                variant="standard"
                                color="success" />
                            <TextField
                                type="password"
                                label="Password"
                                variant="standard"
                                color="success"/>
                            <Stack direction={'row'} sx={{ justifyContent: 'space-between', marginTop: 2, textAlign: 'center' }}>
                                <Link to='/forget'><Typography sx={{cursor:'pointer', color:'#0533482'}}>Forgot password?</Typography></Link>
                            </Stack>
                            <Button variant="contained" className="login-button">Login</Button>
                            <Stack direction={'row'} spacing={1} sx={{ margin: '0 auto', alignItems: 'center', marginTop: 1 }}>
                                <Box className='login-box-line'></Box>
                                <Typography> Or </Typography>
                                <Box className='login-box-line'></Box>
                            </Stack>
                            <Button variant="outlined" color="success" className="login-with-google">
                                <GoogleIcon/>
                                <Typography>Login with Google</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Login