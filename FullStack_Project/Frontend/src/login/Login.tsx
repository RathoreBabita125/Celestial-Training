import { alpha, Box, Button, FormControlLabel, Stack, Switch, TextField, Typography } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
    return (
        <>
            <Box component='section'
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: "url('bg-image.avif')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    color: 'white'
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: '50vw',
                        height: '80vh',
                        justifyContent: 'center',
                        alignContent: 'center',
                        boxShadow: 10,
                        color: 'white',
                        backgroundColor: () => alpha('#053348', 0.2)

                    }}>
                    <Box
                        sx={{
                            width: '30vw',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            padding: 7,

                        }}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Log in</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 3, width: '25vw' }}>
                            <TextField
                                type="email"
                                label="Email"
                                variant="standard"
                                color="success"
                                sx={{ color: '#053348' }} />

                            <TextField
                                type="password"
                                label="Password"
                                variant="standard"
                                 color="success"
                                sx={{ color: '#053348' }} />

                            <Stack direction={'row'} sx={{ justifyContent: 'space-between', marginTop: 2, textAlign: 'center' }}>
                                <FormControlLabel sx={{ color: 'white' }} control={<Switch />} label="Remember me" />
                                <Typography sx={{cursor:'pointer'}}>Forgot password?</Typography>
                            </Stack>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#053348', padding: 0.5, fontSize: 20, marginTop: 2, textTransform: 'none' }}>Sign in
                            </Button>
                            <Stack direction={'row'} spacing={1} sx={{ marginTop: 1 }}>
                                <Typography >Don't hava an account? </Typography>
                                <Typography sx={{ color: '#0533482', cursor: 'pointer', fontWeight: 'bold' }}>Sign up</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1} sx={{ margin: '0 auto', alignItems: 'center', marginTop: 1 }}>
                                <Box style={{ width: 180, height: 0, border: '1px solid white' }}></Box>
                                <Typography sx={{ display: 'flex', color: '#053348' }}> Or </Typography>
                                <div style={{ width: 180, height: 0, border: '1px solid white' }}></div>
                            </Stack>

                            <Button variant="outlined" color="success" sx={{ padding: 1, textTransform: 'none', display: 'flex', gap: 2, color:'#053348'}}>
                                <GoogleIcon sx={{ color: 'white' }} />
                                <Typography sx={{color:'#053348'}}>Sign in with Google</Typography>
                            </Button>

                        </Box>
                    </Box>

                </Box>

            </Box>
        </>
    )
}
export default Login