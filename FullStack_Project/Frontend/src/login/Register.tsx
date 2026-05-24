import { Box, Button, Checkbox, Stack, Typography, TextField, FormControlLabel, FormControl } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from "react";



const Register = () => {

    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: ''
    })


    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser(data => ({ ...data, [name]: value }))
    }

    const handleFormSubmit = () => {
      console.log(user);
      
        setUser({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            address: ''
        })

    }

    return (
        <>
            <Box component='section'
                sx={{
                    width: '100vw',
                    height: '100vh',
                    border: '2px solid grey',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: "url('bg-image.avif')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: '80vw',
                        height: '80vh',
                    }}>
                    <Box
                        sx={{
                            width: '40vw',
                            height: '80vh',
                            color: 'white',
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: 10
                        }}>

                        <Box
                            sx={{
                                width: '25vw',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                            }}>

                            <Typography variant="h1" sx={{ fontWeight: 'bold' }}>Welcome</Typography>
                            <Typography variant="body1" color="initial">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta natus fugit commodi aliquid nesciunt omnis?
                            </Typography>

                            <Stack direction={'row'} spacing={1} sx={{ margin: '0 auto', alignItems: 'center' }}>
                                <Box style={{ width: 100, height: 0, border: '1px solid white' }}></Box>
                                <Typography sx={{ display: 'flex' }}> GET CONNECTED WITH </Typography>
                                <div style={{ width: 100, height: 0, border: '1px solid white' }}></div>
                            </Stack>

                            <Stack direction={'row'} spacing={1} sx={{ margin: '0 auto' }}>
                                <Button variant="contained" sx={{ backgroundColor: '#174a62', width: 100, padding: 1 }}><GoogleIcon sx={{ color: 'white' }} /></Button>
                            </Stack>
                        </Box>

                    </Box>
                    <Box
                        sx={{
                            width: '40vw',
                            height: '80vh',
                            backgroundColor: 'white'
                        }}>
                        <Stack
                            direction={"row"}
                            spacing={2}
                            sx={{ float: 'right', marginRight: 5, marginTop: 4 }}>
                            <Button sx={{ color: '#053348' }}>Sign in</Button>
                            <Button variant="contained" sx={{ backgroundColor: '#053348' }}>Register</Button>
                        </Stack>

                        <form action="" >
                            <FormControl sx={{ marginTop: 10, padding: 7 }}>
                                <Typography variant="h4" color="intial" sx={{ fontWeight: 'bold', color: '#053348' }}>Register</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
                                    <TextField
                                        id='fullName'
                                        type="text"
                                        name="fullName"
                                        value={user.fullName}
                                        onChange={handleInput}
                                        label="Full Name"
                                        variant="standard"
                                        required
                                        color="success" />

                                    <TextField
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleInput}
                                        label="Email"
                                        variant="standard"
                                        required
                                        color="success" />

                                    <TextField
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleInput}
                                        label="Password"
                                        required
                                        variant="standard"
                                        color="success" />

                                    <TextField
                                        id="confirm-password"
                                        type="password"
                                        name="confirmPassword"
                                        value={user.confirmPassword}
                                        onChange={handleInput}
                                        label="Confirm Password"
                                        variant="standard"
                                        required
                                        color="success" />

                                    <TextField
                                        id="phone"
                                        type="number"
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleInput}
                                        label="Phone"
                                        variant="standard"
                                        required
                                        color="success" />
                                    <TextField
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={user.address}
                                        onChange={handleInput}
                                        label="Address"
                                        variant="standard"
                                        color="success" />
                                    <FormControlLabel
                                        control={<Checkbox color="success" />}
                                        label="I agree all the statement in Term of service"
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={handleFormSubmit}
                                        sx={{ backgroundColor: '#053348', padding: 0.5, fontSize: 20, marginTop: 2 }}>Sign Up
                                    </Button>

                                    <Stack direction={'row'} spacing={1} sx={{ margin: '0 auto', alignItems: 'center', marginTop: 1 }}>
                                        <Box style={{ width: 100, height: 0, border: '1px solid #053348' }}></Box>
                                        <Typography sx={{ display: 'flex', color: '#053348' }}> Sign up with </Typography>
                                        <div style={{ width: 100, height: 0, border: '1px solid #053348' }}></div>
                                    </Stack>
                                    <Stack direction={'row'} spacing={1} sx={{ margin: '0 auto', marginTop: 1 }}>
                                        <Button variant="outlined" color="success" sx={{ width: 150, padding: 1 }}><GoogleIcon sx={{ color: '#174a62' }} /></Button>
                                    </Stack>
                                    <Stack direction={'row'} spacing={1} sx={{ margin: '0 auto', marginTop: 1 }}>
                                        <Typography sx={{ color: 'gray' }}>Already Have An Account? </Typography>
                                        <Typography sx={{ color: '#174a62', cursor: 'pointer', fontWeight: 'bold' }}>Sign in</Typography>
                                    </Stack>

                                </Box>
                            </FormControl>
                        </form>
                    </Box>

                </Box>
            </Box>
        </>
    )
}

export default Register