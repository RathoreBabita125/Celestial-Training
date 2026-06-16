import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Stack, Box } from "@mui/material";
import MyButton from "../../common/Button";

const ViewProjectModal = ({ open, handleClose, selectedProject}) => {
    if (!selectedProject) return null;
    return (
        <Dialog
            open={open}
            onClose={(event, reason)=>{
                if(reason === "backdropClick" || reason === "escapeKeyDown"){
                    return;
                }
                handleClose()
            }} 
            fullWidth    
        >
            <Box sx={{ padding: 2 }}>
                <DialogTitle sx={{fontWeight:'bold'}}>Project Details</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <Typography><strong>ID:</strong> {selectedProject.id}</Typography>
                        <Typography><strong>Title:</strong> {selectedProject.title}</Typography>
                        <Typography><strong>Description:</strong> {selectedProject.description}</Typography>
                        <Typography><strong>Project Manager:</strong> {selectedProject.projectManager}</Typography>
                        <Stack direction={'row'} spacing={1}>
                            <Typography><strong>Engineers:  </strong></Typography>
                            <Stack direction={'row'} spacing={1}>
                                {selectedProject?.engineers?.map((engineer, index)=>{
                                    return <Typography key={index}>{engineer}</Typography>
                                })}
                            </Stack>                         
                        </Stack>
                        <Typography><strong>Status:</strong> {selectedProject.status}</Typography>
                        <Typography><strong>Priority:</strong> {selectedProject.priority}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <MyButton handler={handleClose} name="Close"/>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default ViewProjectModal;
