import { Box, Button, Stack, Typography, TextField, FormControl } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from "react";
import { Link } from "react-router";
import {useMutation} from '@apollo/client/react';
import './Login.css';
import { SIGNUP } from "../../query/query";

const Signup = () => {
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });
    const [error, setError] = useState({
        fullName: false,
        email: false,
        role: false,
        password: false,
        confirmPassword: false,
        phone: false,
    });
    const[newError, setNewError]=useState("");
    const[signupData]=useMutation(SIGNUP);
    const[successMessage, setSuccessMessage]=useState("")

    const validateInput = () => {
        const nameInput = /^[A-Za-z ]*$/;
        const emailInput = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordInput = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        const phoneInput = /^[6-9]\d{9}$/;

        if (user.fullName?.trim() === '' || !nameInput.test(user.fullName)) {
            setError((preData) => ({ ...preData, fullName: true }));
        }
        else if (user.email?.trim() === '' || !emailInput.test(user.email)) {
            setError((preData) => ({ ...preData, fullName: false,  email: true }));
        }
        else if (user.role?.trim() === '') {
            setError((preData) => ({ ...preData, email: false, role: true }));
        }
        else if (user.password?.trim() === '' || !passwordInput.test(user.password)) {
            setError((preData) => ({ ...preData, role: false, password: true }));
        }
        else if (user.confirmPassword==='' || user.password !== user.confirmPassword) {
            setError((preData) => ({ ...preData, password: false, confirmPassword: true }));
        }
        else if (user.phone?.trim() === '' || !phoneInput.test(user.phone)) {
            setError((preData) => ({ ...preData, confirmPassword: false , phone: true }));
        }
        else{
            setError((preData) => ({ ...preData, phone: false }));
        }
        return !Object.values(error).includes(true);
    }

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser(data => ({ ...data, [name]: value }));
    }

    const handleFormSubmit = async(event) => {
        event.preventDefault();
        const checkValidate = validateInput();

        if (!checkValidate) {            
            setNewError("Invalid Credentials. Try again");
        }
        try {
            const response= await signupData({
                variables:{
                    fullName:user.fullName,
                    email:user.email,
                    password:user.password,
                    confirmPassword:user.confirmPassword,
                    role:user.role,
                    phone:user.phone
                }
            });
            if(response){
                setSuccessMessage(`Congratulation! ${user.fullName}.You have successfully registered.`)
            }
            console.log(response)
            setUser({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                role: '',
            })                      
        } catch (error) {
            setNewError(error.graphQLErrors?.[0]?.message || error.message)
        }
    }

    const showMessage = newError 
                        ? 
                            <Typography variant="h6" color="d" sx={{marginTop:2}}>{newError.message}</Typography>
                        :   <Typography variant="h6" sx={{marginTop:2}}>{successMessage} </Typography>;

    return (
        <>
            <Box className='register-section'>
                <Box className='register-parent'>
                    <Box className='register-left-section'>
                        <Box className='register-left'>
                            <Typography className="register-left-typo">Welcome</Typography>
                            <Typography className="register-left-typo">Task Management</Typography>
                            <Typography variant="body1" color="initial">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta natus fugit commodi aliquid nesciunt omnis?
                            </Typography>
                        </Box>
                    </Box>
                    <Box className='register-right-section'>
                        <Stack direction={"row"} spacing={2} className="register-right-top-button">
                            <Link to='/signin'><Button sx={{ color: '#053348' }}>Sign in</Button></Link>
                            <Link to='/signup'><Button variant="contained" sx={{ backgroundColor: '#053348' }}>Sign up</Button></Link>
                        </Stack>
                        <FormControl sx={{ marginTop: 2, padding: 7 }}>
                            <Typography variant="h4" color="intial" sx={{ fontWeight: 'bold' }}>Register</Typography>
                            <Box className='register-form'>
                                <TextField
                                    id='fullName'
                                    error={error.fullName}
                                    helperText={error.fullName && newError ? 'Only letters and space are allow' : ''}
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
                                    error={error.email}
                                    helperText={error.email && newError ? 'Please enter valid email' : ''}
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInput}
                                    label="Email"
                                    variant="standard"
                                    required
                                    color="success" />
                                <TextField
                                    id="role"
                                    error={error.role}
                                    helperText={error.role && newError ? 'This field is required' : ''}
                                    type="text"
                                    name="role"
                                    value={user.role}
                                    onChange={handleInput}
                                    label="Role"
                                    variant="standard"
                                    required
                                    color="success" />
                                <TextField
                                    id="password"
                                    error={error.password}
                                    helperText={error.password && newError ? 'Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8' : ''}
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
                                    error={error.confirmPassword}
                                    helperText={error.confirmPassword && newError ? 'Password does not match' : ''}
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
                                    error={error.phone}
                                    helperText={error.phone && newError ? 'Enter valid 10 digits contact number' : ''}
                                    type="number"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleInput}
                                    label="Phone"
                                    variant="standard"
                                    required
                                    color="success" />
                                <Button className="register-signup-button" variant="contained" onClick={handleFormSubmit}>Sign Up</Button>
                                <div>{showMessage}</div>
                                <Stack direction={'row'} spacing={1} className="register-signup">
                                    <Box className='register-box-line'></Box>
                                    <Typography> Sign up with </Typography>
                                    <Box className='register-box-line'></Box>
                                </Stack>
                                <Stack direction={'row'} spacing={1} sx={{ margin: '0 auto', marginTop: 1 }}>
                                    <Button className="register-with-google" variant="outlined" color="success"><GoogleIcon sx={{ color: '#174a62' }} /></Button>
                                </Stack>
                            </Box>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Signup