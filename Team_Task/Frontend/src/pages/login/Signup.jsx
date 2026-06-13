import { Box, Button, Stack, Typography, TextField, FormControl, InputAdornment, Select, MenuItem, FormHelperText, IconButton } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useMutation } from '@apollo/client/react';
import './Login.css';
import { SIGNUP } from "../../query/query";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { validateField } from "../../common/formFieldValidate";
import { emailInputCheck, phoneInputCheck } from "../../constants/const.js";

const Signup = () => {
    const navigate=useNavigate();
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [error, setError] = useState({
        fullName: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [showVisible, setShowVisible] = useState(false);
    const [signupData] = useMutation(SIGNUP);

    // field validation
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const latestUser = { ...user, [name]: value }
        const errorMsg = validateField(name, value, latestUser);
        setError((prev) => ({ ...prev, [name]: errorMsg }));
    };

    // onChange 
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedUser = { ...user, [name]: value }
        setUser(updatedUser);

        if (error[name] !== '') {
            const errorMsg = validateField(name, value, updatedUser);
            setError((prev) => ({ ...prev, [name]: errorMsg }));
        }
    };

    //validate input
    const validateInput = () => {
        const fields = ['fullName', 'email', 'password', 'confirmPassword', 'role', 'phone'];
        const newErrors = {};
        let isValid = true;

        fields.forEach((field) => {
            const errorMsg = validateField(field, user[field], user);
            newErrors[field] = errorMsg;
            if (errorMsg) isValid = false;
        });
        setError(newErrors);
        return isValid;
    };

    const checkFormValid=user?.fullName?.trim() !== "" &&
        user?.email?.trim() !== "" &&
        emailInputCheck.test(user?.email) &&
        user?.password.length >= 8 &&
        user?.confirmPassword === user?.password &&
        user?.role !== "" &&
        user?.phone.trim() !== "" &&
        phoneInputCheck.test(user?.phone);

    const handleSignupButton = async (event) => {
        event.preventDefault();
        const checkValidate = validateInput();
        if (!checkValidate) {
            throw "Invalid Credentials";
        }
        try {
            const response = await signupData({
                variables: {
                    fullName: user.fullName,
                    email: user.email,
                    password: user.password,
                    confirmPassword: user.confirmPassword,
                    role: user.role,
                    phone: user.phone
                }
            });      
            if (response) {
                toast.success("You have successfully signed up.")
                setUser({
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    role: '',
                });
               navigate('/signin');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <>
            <Box className='register-section'>
                <Box className='register-parent'>
                    <Box className='register-left-section'>
                        <Box className='register-left'>
                            <Typography className="register-left-typo">Project Management System</Typography>
                            <Typography variant="body1" color="initial" sx={{ marginTop: 2, fontSize: 18 }}>
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
                                    helperText={error.fullName ? error.fullName : ''}
                                    type="text"
                                    onBlur={handleBlur}
                                    name="fullName"
                                    value={user.fullName}
                                    onChange={handleChange}
                                    label="Full Name"
                                    variant="standard"
                                    required
                                    color="success" />
                                <TextField
                                    id="email"
                                    error={error.email}
                                    helperText={error.email ? error.email : ''}
                                    type="email"
                                    onBlur={handleBlur}
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    label="Email"
                                    variant="standard"
                                    required
                                    color="success" />
                                <TextField
                                    id="password"
                                    error={error.password}
                                    helperText={error.password ? error.password : ''}
                                    type={showVisible.password ? 'text' : 'password'}
                                    name="password"
                                    onBlur={handleBlur}
                                    value={user.password}
                                    onChange={handleChange}
                                    label="Password"
                                    required
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton aria-label="" onClick={() => setShowVisible((pre) => ({ ...pre, password: !pre.password }))}>
                                                        {showVisible.password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                    variant="standard"
                                    color="success" />
                                <TextField
                                    id="confirm-password"
                                    error={error.confirmPassword}
                                    helperText={error.confirmPassword ? error.confirmPassword : ''}
                                    type={showVisible.confirmPassword ? 'text' : 'password'}
                                    onBlur={handleBlur}
                                    name="confirmPassword"
                                    value={user.confirmPassword}
                                    onChange={handleChange}
                                    label="Confirm Password"
                                    required
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton aria-label="" onClick={() => setShowVisible((pre) => ({ ...pre, confirmPassword: !pre.confirmPassword }))}>
                                                        {showVisible.confirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                    variant="standard"
                                    color="success"
                                />
                                <FormControl error={!!error.role} sx={{ mt: 2 }} fullWidth>
                                    <Select
                                        sx={{ mt: 1 }}
                                        variant="standard"
                                        name="role"
                                        value={user.role}
                                        onChange={handleChange}
                                        required
                                        onBlur={handleBlur}
                                        displayEmpty
                                        error={error.role}
                                        label="Role *"
                                        color="success"
                                    >
                                        <MenuItem value="" disabled >Role *</MenuItem>
                                        <MenuItem value="Admin">Admin</MenuItem>
                                        <MenuItem value="Project Manager">Project Manager</MenuItem>
                                        <MenuItem value="Engineer">Engineer</MenuItem>
                                    </Select>
                                    <FormHelperText>{error.role ? error.role : ''}</FormHelperText>
                                </FormControl>
                                <TextField
                                    id="phone"
                                    error={error.phone}
                                    helperText={error.phone ? error.phone : ''}
                                    type="number"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    label="Phone"
                                    variant="standard"
                                    color="success"
                                />
                                <Button
                                    className="register-signup-button"
                                    variant="contained"
                                    onClick={handleSignupButton}
                                    disabled={!checkFormValid}
                                >
                                    Sign Up
                                </Button>
                                <Stack direction={'row'} spacing={1} className="register-signup">
                                    <Box className='register-box-line'></Box>
                                    <Typography> Sign up with </Typography>
                                    <Box className='register-box-line'></Box>
                                </Stack>
                                <Stack direction={'row'} spacing={1} sx={{ margin: '0 auto', marginTop: 1 }}>
                                    <Button className="register-with-google" variant="outlined" color="success"><GoogleIcon sx={{ color: '#053348' }} /></Button>
                                </Stack>
                            </Box>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
export default Signup;