import { Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Stack, FormControl, FormLabel, Box, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import MyButton from "../../common/Button";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import { UPDATEPROJECT } from "../../query/project/EditProject";

const STATUS_OPTIONS = [
    "Yet to be started",
    "In progress",
    "Completed",
    "Delivered",
    "Pending",
];

const UpdateProjectStatusModal = ({ open, handleClose, projectList }) => {
    const [updateProject] = useMutation(UPDATEPROJECT, {
        refetchQueries: ['getProjects']
    });
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [status, setStatus] = useState("");
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if (!open) {
            setSelectedProjectId("");
            setStatus("");
            setEndDate(null);
        }
    }, [open]);

    const handleProjectChange = (event) => {
        const projectId = event.target.value;
        setSelectedProjectId(projectId);
        const project = projectList?.find((p) => p.id === projectId);
        setStatus(project?.status || "");
        setEndDate(project?.endDate ? new Date(project.endDate) : null);
    };

    const isValid = selectedProjectId !== "" && status.trim() !== "" && endDate !== null;

    const handleUpdate = async () => {
        try {
            const response = await updateProject({
                variables: {
                    id: selectedProjectId,
                    status: status,
                    endDate: endDate,
                }
            });
            if (response) {
                toast.success("Project updated successfully");
                setSelectedProjectId("");
                setStatus("");
                setEndDate(null);
                handleClose();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    
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
            maxWidth="sm"
        >
            <Box sx={{ padding: 2 }}>
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: 25, color: '#053348' }}>
                    Update Project Status
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <FormControl fullWidth>
                            <FormLabel sx={{ mb: 1, mt: 2 }}>Project Name *</FormLabel>
                            <Select
                                value={selectedProjectId}
                                onChange={handleProjectChange}
                                required
                                displayEmpty
                            >
                                <MenuItem value="" disabled>Select Project</MenuItem>
                                {projectList?.map((project) => (
                                    <MenuItem value={project.id} key={project.id}>
                                        {project.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel sx={{ mb: 1 }}>Project Status *</FormLabel>
                            <Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                                displayEmpty
                                disabled={!selectedProjectId}
                            >
                                <MenuItem value="" disabled>Select Status</MenuItem>
                                {STATUS_OPTIONS.map((option) => (
                                    <MenuItem value={option} key={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel sx={{ mb: 1 }}>Deadline (End Date) *</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue)}
                                    disabled={!selectedProjectId}
                                    slotProps={{
                                        textField: { error: false, fullWidth: true }
                                    }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <MyButton handler={handleClose} name="Cancel" />
                    <Button
                        sx={{ backgroundColor: isValid ? '#053348' : '#E0E0E0', color: 'white' }}
                        onClick={handleUpdate}
                        disabled={!isValid}
                    >Update</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default UpdateProjectStatusModal;
