import { alpha, Box, Button, TextField, Typography } from "@mui/material"
import ArrowBack from '@mui/icons-material/ArrowBack';

const Forget = () => {
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
                            padding: 12,
                           
                            

                        }}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', marginTop: 5}}>Forget Password?</Typography>
                        <Typography variant="body1">No worries, we'll send you reset instruction</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 3, width: '25vw' }}>
                            <TextField
                                type="email"
                                label="Email"
                                variant="outlined"
                                color="success"
                                sx={{ color: '#053348' }} />

                            <Button
                                variant="contained"
                                sx={{ 
                                    backgroundColor: '#053348', 
                                    padding: 1.5, 
                                    fontSize: 20, 
                                    textTransform:'none',
                                    marginTop: 3}}>
                                    Reset Password
                            </Button>

                            <Button variant="text" sx={{textTransform:'none', display:'flex', gap:2, color:'white'}}>
                                <ArrowBack/>
                                <Typography>Back to Log in</Typography>
                            </Button>
                            

                        </Box>
                    </Box>

                </Box>

            </Box>
        </>
    )
}
export default Forget