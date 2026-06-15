import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Stack, Box } from "@mui/material";
import MyButton from "../../common/Button";

const ViewTask = ({ open, handleClose, myTask }) => {
    if (!myTask) return null;
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            sx={{ opacity: "50%" }}
        >
            <Box sx={{padding:2}}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>Project Details</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <Typography><strong>ID:</strong> {myTask.id}</Typography>
                        <Typography><strong>Task Name:</strong> {myTask.title}</Typography>
                        <Typography><strong>Task Description:</strong> {myTask.description}</Typography>
                        <Typography><strong>Project Name:</strong> {myTask?.project?.title}</Typography>
                        <Typography><strong>Status:</strong> {myTask.status}</Typography>
                        <Typography><strong>Priority:</strong> {myTask.priority}</Typography>
                        <Typography><strong>Due Date:</strong> {myTask.dueDate}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <MyButton handler={handleClose} name="Close" />
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default ViewTask;
