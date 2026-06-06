import { Dialog, DialogTitle, DialogContent, DialogActions, Typography} from "@mui/material";
import MyButton from "../../common/Button";
import { DELETEPROJECT } from "../../query/query";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";

const DeleteProjectModal = ({open, handleClose, selectDeleteID, setOpenDelete}) => {

    const [deleteProject] = useMutation(DELETEPROJECT);
    
    const handleDeleteProject = async () => {
        try {
            const response = await deleteProject({
                variables: {
                    id: selectDeleteID
                }
            });
            if(response){
                console.log(response);
                toast.success("Project has been deleted successfully.");
                setOpenDelete(false);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth>
            <DialogTitle sx={{color:'#053348', fontWeight:'bold'}}>Delete Project</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete this project?</Typography>
            </DialogContent>

            <DialogActions>
                <MyButton handler={handleClose} name="Cancel"/>
                <MyButton handler={handleDeleteProject} name="Delete"/>
            </DialogActions>
        </Dialog>
    );
};
export default DeleteProjectModal;

