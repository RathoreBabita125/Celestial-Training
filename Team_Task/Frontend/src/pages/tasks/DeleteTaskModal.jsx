import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box} from "@mui/material";
import MyButton from "../../common/Button";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";
import { DELETETASK } from "../../query/task/DeleteTask";

const DeleteTaskModal = ({open, handleClose, selectDeleteID, setOpenDelete}) => {

    const [deleteTask] = useMutation(DELETETASK, {
        refetchQueries:['getTasks']
    });  
    const handleDeleteTask = async () => {
        try {
            const response = await deleteTask({
                variables: {
                    id: selectDeleteID
                }
            });
            if(response){
                toast.success("Project has been deleted successfully.");
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
                handleClose()
            }}
            fullWidth
            sx={{opacity:"8 0%"}}
            >
            <Box sx={{padding:1.5}}>
                <DialogTitle sx={{color:'#053348', fontWeight:'bold'}}>Delete Task</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this task?</Typography>
                </DialogContent>

                <DialogActions>
                    <MyButton handler={handleClose} name="Cancel"/>
                    <MyButton handler={handleDeleteTask} name="Delete"/>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default DeleteTaskModal;

