import Typography from '@mui/material/Typography'
import { Dialog, DialogContent, DialogActions, Box } from "@mui/material";
import { useMutation } from "@apollo/client/react";
import MyButton from "../../common/Button";
import { DELETEUSER } from "../../query/user/DeleteUser";
import { toast } from "react-toastify";

const DeleteUser = ({ open, handleClose, setOpenDelete, deleteUser }) => {
    const [updateUser]=useMutation( DELETEUSER, {
            refetchQueries:['getUsers']
        });

    const handleDeleteUser = async() => {
        try {
            const response=await updateUser({
                variables:{
                    id:deleteUser.id
                }
            })
            if(response){
                toast.success("User has been deleted successfully");
                setOpenDelete(false);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <Dialog 
            open={open} 
            onClose={(event, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    return;
                }
                handleClose();
            }}
            fullWidth 
            maxWidth="sm">
            <Box sx={{ padding: 2 }}>
                <DialogContent>
                   <Typography variant="h6" color="initial" sx={{mb:1}}>Are you sure? You want to delete this user.</Typography>
                </DialogContent>
                <DialogActions>
                    <MyButton handler={() => setOpenDelete(false)} name="Cancel" />
                    <MyButton handler={handleDeleteUser} name="Delete" />
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default DeleteUser;