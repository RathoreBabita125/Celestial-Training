import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Stack } from "@mui/material";
import MyButton from "../../common/Button";

const ViewProjectModal = ({ open, handleClose, project, }) => {
    if (!project) return null;
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth    
        >
            <DialogTitle sx={{fontWeight:'bold'}}>Project Details</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <Typography><strong>ID:</strong> {project.id}</Typography>
                    <Typography><strong>Title:</strong> {project.title}</Typography>
                    <Typography><strong>Description:</strong> {project.description}</Typography>
                    <Typography><strong>Project Manager:</strong> {project.projectManager}</Typography>
                    <Typography><strong>Enginners:</strong> {project.engineers}</Typography>
                    <Typography><strong>Status:</strong> {project.status}</Typography>
                    <Typography><strong>Priority:</strong> {project.priority}</Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <MyButton handler={handleClose} name="Close"/>
            </DialogActions>
        </Dialog>
    );
};
export default ViewProjectModal;
