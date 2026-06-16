import { Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Stack, FormControl, FormLabel, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import MyButton from "../../common/Button";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import { UPDATETASK } from "../../query/task/UpdateTask";

const STATUS_OPTIONS = [
    "Yet to be started",
    "In progress",
    "Completed",
    "Delivered",
    "Pending",
];

const UpdateTaskStatusModal = ({ open, handleClose, taskList }) => {
    const [updateTask] = useMutation(UPDATETASK, {
        refetchQueries: ['getTasks']
    });
    const [selectedTaskId, setSelectedTaskId] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (!open) {
            setSelectedTaskId("");
            setStatus("");
        }
    }, [open]);

    const handleTaskChange = (event) => {
        const taskId = event.target.value;
        setSelectedTaskId(taskId);
        const task = taskList?.find((t) => t.id === taskId);
        setStatus(task?.status || "");
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    const isValid = selectedTaskId !== "" && status.trim() !== "";

    const handleUpdate = async () => {
        try {
            const response = await updateTask({
                variables: {
                    id: selectedTaskId,
                    status: status,
                }
            });
            if (response) {
                toast.success("Task status updated successfully");
                setSelectedTaskId("");
                setStatus("");
                handleClose();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
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
            maxWidth="sm"
            >
            <Box sx={{ padding: 2 }}>
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: 25, color: '#053348' }}>Update Task Status</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <FormControl fullWidth>
                            <FormLabel sx={{ mb: 1, mt: 2 }}>Task Title *</FormLabel>
                            <Select
                                name="taskId"
                                value={selectedTaskId}
                                onChange={handleTaskChange}
                                required
                                displayEmpty
                                >
                                <MenuItem value="" disabled>Select Task</MenuItem>
                                {taskList?.map((task) => (
                                    <MenuItem value={task.id} key={task.id}>{task.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel sx={{ mb: 1 }}>Task Status *</FormLabel>
                            <Select
                                name="status"
                                value={status}
                                onChange={handleStatusChange}
                                required
                                displayEmpty
                                disabled={!selectedTaskId}
                            >
                                <MenuItem value="" disabled>Select Status</MenuItem>
                                {STATUS_OPTIONS.map((option) => (
                                    <MenuItem value={option} key={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <MyButton handler={handleClose} name="Cancel" />
                    <Button
                        sx={{ backgroundColor: isValid ? '#053348' : '#E0E0E0', color: 'white' }}
                        onClick={handleUpdate}
                        disabled={!isValid}
                        >Update
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default UpdateTaskStatusModal;