import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import MyButton from './Button'
import { Box, Typography } from '@mui/material'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const ProfileModal=({open, onclose, setOpenProfile})=>{

    const {userAuth} = useContext(AuthContext);

    const handleCloseBTN=()=>{
        setOpenProfile(false)
    }

    return(
        <>
            <Dialog 
                open={open} 
                onClose={onclose} 
                fullWidth 
                maxWidth="sm"
            >
                <Box sx={{padding:2}}>
                    <DialogTitle>
                        <Typography variant="h5" color="initial" sx={{color:'#053348'}}>Personal Information</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant="body1" color="initial"><strong>Name: </strong>{userAuth.fullName}</Typography>
                            <Typography variant="body1" color="initial"><strong>Email: </strong> {userAuth.email}</Typography>
                            <Typography variant="body1" color="initial"><strong>Role: </strong> {userAuth.role}</Typography>
                            <Typography variant="body1" color="initial"><strong>Contact: </strong> {userAuth.phone}</Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <MyButton name="Close" handler={handleCloseBTN}/>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}
export default ProfileModal;