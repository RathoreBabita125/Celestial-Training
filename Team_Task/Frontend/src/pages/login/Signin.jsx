import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import './Login.css';
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../../query/query";


const Signin = () => {

    const navigate=useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({
        email: "",
        password: ""
    });
    const[newErrorMessage, setNewErrorMessage]=useState("")
    const [loginData]=useMutation(LOGIN)
    
    const validateLoginInput = () => {
        const newError={};
        const emailInput = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordInput = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        //email
        if(!user.email || user.email.trim()===""){
            newError.email="This field is required";
        }
        else if(!emailInput.test(user.email)){
            newError.email="Please provide valid email";
        }

        //password
        if(!user.password || user.password.trim()===""){
            newError.password="This field is required";
        }
        else if(!passwordInput.test(user.password)){
            newError.password="Please enter valid password";
        }    
        setError(newError);

        return Object.keys(newError).length===0
    }

    const inputHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser((data) => ({ ...data, [name]: value }));
    }

    const loginButtonHandler = async(event) => {
        event.preventDefault();
        const checkValidates=validateLoginInput(); 
        if(!checkValidates){
            setNewErrorMessage("Please enter valid email or password")
        }
        try {
            const userData=await loginData({
                variables:{
                    email:user.email,
                    password:user.password
                }
            })
            setNewErrorMessage("")
            navigate('/dashboard')
            console.log(userData);              
        } catch (error) {
            setNewErrorMessage(error.message)
        }
    }
    return (
        <>
            <Box className="login-section">
                <Box className='login-box'>
                    <Box className='login-box-1'>
                        <Stack direction={"row"} spacing={2} className="login-right-top-button">
                            <Link to='/signin'><Button sx={{ color: '#053348' }}>Sign in</Button></Link>
                            <Link to='/signup'><Button variant="contained" sx={{ backgroundColor: '#053348' }}>Sign up</Button></Link>
                        </Stack>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Sign in</Typography>
                        <Box className='login-form-box'>
                            <TextField
                                type="email"
                                name="email"
                                error={error.email}
                                helperText={error?.email ? error.email:''}
                                value={user.email}
                                onChange={inputHandler}
                                label="Email"
                                variant="standard"
                                color="success" />
                            <TextField
                                type="password"
                                name="password"
                                error={error.password}
                                helperText={error?.password ? error.password:''}
                                value={user.password}
                                onChange={inputHandler}
                                label="Password"
                                variant="standard"
                                color="success" />
                            <Stack direction={'row'} sx={{ justifyContent: 'space-between', marginTop: 2, textAlign: 'center' }}>
                                <Link to='/forget'><Typography sx={{ cursor: 'pointer', color: '#0533482' }}>Forgot password?</Typography></Link>
                            </Stack>
                            <Button variant="contained" className="login-button" onClick={loginButtonHandler}>Sign in</Button>
                            {newErrorMessage && <Typography variant="body1" sx={{marginTop:2, color:'red'}}>{newErrorMessage}</Typography>}
                            <Stack direction={'row'} spacing={1} sx={{ margin: '0 auto', alignItems: 'center', marginTop: 1 }}>
                                <Box className='login-box-line'></Box>
                                <Typography> Or </Typography>
                                <Box className='login-box-line'></Box>
                            </Stack>
                            <Button variant="outlined" color="success" className="login-with-google">
                                <GoogleIcon />
                                <Typography>Sign in with Google</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Signin