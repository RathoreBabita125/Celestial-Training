import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box} from "@mui/material";
import MyButton from "../../common/Button";
import { DELETEPROJECT } from "../../query/query";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react";

const DeleteProjectModal = ({open, handleClose, selectDeleteID, setOpenDelete}) => {
    const [deleteProject] = useMutation(DELETEPROJECT, {
        refetchQueries:['getProjects']
    });
    const handleDeleteProject = async () => {
        try {
            const response = await deleteProject({
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
            onClose={handleClose}
            sx={{opacity:"60%"}}
            fullWidth>
            <Box sx={{ padding: 2 }}>
                <DialogTitle sx={{color:'#053348', fontWeight:'bold'}}>Delete Project</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">Are you sure you want to delete this project?</Typography>
                </DialogContent>

                <DialogActions>
                    <MyButton handler={handleClose} name="Cancel"/>
                    <MyButton handler={handleDeleteProject} name="Delete"/>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default DeleteProjectModal;

