import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Link } from "react-router";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from "react-toastify";
import { validateField } from "../../common/formFieldValidate";
import { FORGET } from "../../query/loginQuery/Forget";

const Forget = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        message: ''
    });
    const [showVisible, setShowVisible] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const latestUser = { ...user, [name]: value };
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
        const fields = ['email', 'password', 'confirmPassword'];
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

    const [forgetData] = useMutation(FORGET);
    const handleResetBTN = async (event) => {
        event.preventDefault();
        const checkValidate = validateInput();
        if (!checkValidate) {
            throw new Error("Please enter valid password");
        }
        try {
            const response = await forgetData({
                variables: {
                    email: user.email,
                    password: user.password,
                    confirmPassword: user.confirmPassword
                }
            });
            if (response) {
                toast.success("Password has been updated successfully");
                setUser({
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
            }
        } catch (error) {
            toast.error(error.message, "Please try again")
        }
    }
    return (
        <>
            <Box className='forget-section'>
                <Box className='forget-box'>
                    <Box className='forget-box-1'>
                        <Box className='forget-form-box'>
                            <Typography className="forget-form-typo">Forget Password?</Typography>
                            <TextField
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={error.email}
                                helperText={error.email ? error.email : ''}
                                type="email"
                                label="Email"
                                variant="outlined"
                                color="success" />
                            <TextField
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={error.password}
                                type="password"
                                helperText={error.password ? error.password : ''}
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
                                label="New password"
                                variant="outlined"
                                color="success" />
                            <TextField
                                name="confirmPassword"
                                value={user.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="password"
                                error={error.confirmPassword}
                                helperText={error.confirmPassword ? error.confirmPassword : ''}
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
                                label="Confirm New password"
                                variant="outlined"
                                color="success" />
                            <Button variant="contained" className="reset-button" onClick={handleResetBTN}>Reset Password</Button>
                            <Link to='/signin'>
                                <Button variant="text" className="back-login">
                                    <ArrowBack />
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
export default Forget;