import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Stack } from "@mui/material";
import MyButton from "../../common/Button";

const ViewTaskModal = ({ open, handleClose, selectedTask}) => {
    if (!selectedTask) return null;
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth    
        >
            <DialogTitle sx={{fontWeight:'bold'}}>Project Details</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <Typography><strong>ID:</strong> {selectedTask.id}</Typography>
                    <Typography><strong>Task Name:</strong> {selectedTask.title}</Typography>
                    <Typography><strong>Task Description:</strong> {selectedTask.description}</Typography>
                    <Typography><strong>Engineer:</strong> {selectedTask.assignedTo.fullName}</Typography>
                    <Typography><strong>Project Name:</strong> {selectedTask?.project?.title}</Typography>
                    <Typography><strong>Status:</strong> {selectedTask.status}</Typography>
                    <Typography><strong>Priority:</strong> {selectedTask.priority}</Typography>
                    <Typography><strong>Due Date:</strong> {selectedTask.dueDate}</Typography>
                    <Typography><strong>Estimate Date:</strong> {selectedTask.estimateDate}</Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <MyButton handler={handleClose} name="Close"/>
            </DialogActions>
        </Dialog>
    );
};
export default ViewTaskModal;
