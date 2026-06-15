import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import { toast } from "react-toastify";
import { validateField } from "../../common/formFieldValidate";
import { emailInputCheck } from "../../constants/const";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../../query/loginQuery/Login.js";

const Signin = () => {
    const navigate = useNavigate();
    const [showVisible, setShowVisible] = useState(false);
    const { refetch } = useContext(AuthContext);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({
        email: "",
        password: ""
    });
    const [loginData] = useMutation(LOGIN);

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const latestUser = { ...user, [name]: value }
        const errorMsg = validateField(name, value, latestUser);
        setError((prev) => ({ ...prev, [name]: errorMsg }));
    };

    // onChange handler
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
        const fields = ['email', 'password'];
        const newErrors = {};
        let isValid = true;
        fields.forEach((field) => {
            const errorMsg = validateField(field, user[field]);
            newErrors[field] = errorMsg;
            if (errorMsg) isValid = false;
        });
        setError(newErrors);
        return isValid;
    };

    const isFormValid =
        user.email.trim() !== "" &&
        emailInputCheck.test(user.email) &&
        user.password.length >= 8;

    const loginButtonHandler = async (event) => {
        event.preventDefault();
        const checkValidates = validateInput();
        if (!checkValidates) {
            throw new Error("Enter valid details");
        }
        try {
            const { data } = await loginData({
                variables: {
                    email: user.email,
                    password: user.password
                }
            });
            const { user: userData } = data.login;
            if (userData.role === 'Admin' || userData.role === 'Project Manager' || userData.role === 'Engineer') {
                await refetch()
                navigate('/dashboard', { replace: true });
                toast.success("Successfully logged in.");
            }
        } catch (error) {
            toast.error(error.message);
        };
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
                                helperText={error?.email ? error.email : ''}
                                value={user.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Email"
                                variant="standard"
                                color="success" />
                            <TextField
                                type={showVisible.password ? 'text' : 'password'}
                                name="password"
                                error={error.password}
                                helperText={error?.password ? error.password : ''}
                                value={user.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Password"
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
                            <Stack direction={'row'} sx={{ justifyContent: 'space-between', marginTop: 2, textAlign: 'center' }}>
                                <Link to='/forget'><Typography sx={{ cursor: 'pointer', color: '#053348' }}>Forgot password?</Typography></Link>
                            </Stack>
                            <Button
                                variant="contained"
                                className="login-button"
                                onClick={loginButtonHandler}
                                disabled={!isFormValid}
                            >Sign in</Button>
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