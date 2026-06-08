import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Stack } from "@mui/material";
import MyButton from "../../common/Button";

const ViewProjectModal = ({ open, handleClose, selectedProject}) => {
    if (!selectedProject) return null;
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth    
        >
            <DialogTitle sx={{fontWeight:'bold'}}>Project Details</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <Typography><strong>ID:</strong> {selectedProject.id}</Typography>
                    <Typography><strong>Title:</strong> {selectedProject.title}</Typography>
                    <Typography><strong>Description:</strong> {selectedProject.description}</Typography>
                    <Typography><strong>Project Manager:</strong> {selectedProject.projectManager}</Typography>
                    <Typography><strong>Enginners:</strong> {selectedProject?.engineers}</Typography>
                    <Typography><strong>Status:</strong> {selectedProject.status}</Typography>
                    <Typography><strong>Priority:</strong> {selectedProject.priority}</Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <MyButton handler={handleClose} name="Close"/>
            </DialogActions>
        </Dialog>
    );
};
export default ViewProjectModal;
