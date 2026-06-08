import Typography from '@mui/material/Typography'
import { Dialog, DialogContent, DialogActions, Box } from "@mui/material";
import { useMutation } from "@apollo/client/react";
import MyButton from "../../common/Button";
import { DELETEUSER } from "../../query/query";
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
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{opacity:"30%"}}>
            <Box sx={{ padding: 3 }}>
                <DialogContent>
                   <Typography variant="h5" color="initial">Are you sure? You want to delete this user.</Typography>
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