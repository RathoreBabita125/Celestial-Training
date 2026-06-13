import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputAdornment, IconButton, Stack, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import MyButton from "../../common/Button";
import { UPDATEUSER } from "../../query/query";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from "react-toastify";
import { emailInputCheck, phoneInputCheck } from "../../constants/const";

const UpdateUser = ({ open, handleClose, setOPenUpdateUser, userEdit }) => {
    const [updateUser]=useMutation(UPDATEUSER,{
            refetchQueries:['getUsers']
    });
    const [showVisible, setShowVisible] = useState(false);
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: '',
        role: '',
        phone: ''
    });
    useEffect(()=>{
        if(userEdit){
            setUser(userEdit)
        }
    }, [userEdit])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser((preData) => ({ ...preData, [name]: value }));
    };

    const handleUpdateUser = async() => {
        try {
            const response = await updateUser({
                variables: {
                    id:user.id,
                    fullName: user.fullName,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                    phone: user.phone
                }
            });
            if(response){
                toast.success("User has been updated successfully.");
                setOPenUpdateUser(false);
            }        
            setUser({
                fullName: '',
                email: '',
                password: '',
                phone: '',
                role: '',
            });
        } catch (error) {
            toast.error(error.message);
        }
    }   
    const isFormValid =
        user.email !== "" &&
        emailInputCheck.test(user.email) &&
        user.password !=="" &&
        user.fullName !="" &&
        user.role !=="" &&
        user.phone !="" &&
        phoneInputCheck.test(user.phone)

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{opacity:"30%"}}>
            <Box sx={{ padding: 3 }}>
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: 22 }}>Update Existing User</DialogTitle>
                <DialogContent>
                    <Stack direction={'column'} spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            id='fullName'
                            type="text"
                            name="fullName"
                            value={user.fullName}
                            onChange={handleChange}
                            label="Full Name"
                            variant="outlined"
                            required
                            color="success" />
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            label="Email"
                            variant="outlined"
                            required
                            color="success" />
                        <TextField
                            id="password"
                            type={showVisible.password ? 'text' : 'password'}
                            name="password"
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
                            variant="outlined"
                            color="success" />
                        <FormControl fullWidth>
                            <Select
                                sx={{ mt: 1 }}
                                variant="outlined"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                                required
                                displayEmpty
                                label="Role *"
                                color="success"
                            >
                                <MenuItem value="" disabled >Role *</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Project Manager">Project Manager</MenuItem>
                                <MenuItem value="Engineer">Engineer</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="phone"
                            type="number"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            label="Phone"
                            variant="outlined"
                            color="success"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <MyButton handler={() => setOPenUpdateUser(false)} name="Cancel" />
                    <Button onClick={handleUpdateUser} disabled={!isFormValid} sx={{backgroundColor:'#053348', color:'white'}}>Update</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default UpdateUser;