import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Stack, FormControl, FormLabel, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import MyButton from "../../common/Button";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useMutation, useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loader";
import { toast } from "react-toastify";
import { GETUSERS } from "../../query/user/GetUser";
import { UPDATETASK } from "../../query/task/UpdateTask";
import { GETPROJECTS } from "../../query/project/GetProject";

const EditTaskModal = ({ open, handleClose, selectedTask }) => {

    const [updateTask] = useMutation(UPDATETASK, {
        refetchQueries: ['getTasks']
    });
    const [editTask, setEditTask] = useState({});
    const { loading: userLoading, data: userData } = useQuery(GETUSERS);
    const { loading: projectLoading, data: projectData } = useQuery(GETPROJECTS);

    useEffect(() => {
        if (selectedTask) {
            setEditTask(
                {
                    id:selectedTask.id || "",
                    title: selectedTask.title || "",
                    description: selectedTask.description || "",
                    status: selectedTask.status || "",
                    priority: selectedTask.priority || "",
                    dueDate: new Date(selectedTask.dueDate),
                    estimateDate: new Date(selectedTask.estimateDate),    
                    projectId: selectedTask.project?.id || "",
                    assignedTo: selectedTask.assignedTo?.id || ""
                });
        }
    }, [selectedTask])

    if (userLoading || projectLoading) {
        return <LoadingCompo />
    }

    //validate 
        const isValidTask =
        editTask?.title?.trim() !== "" &&
        editTask?.description?.trim()!=="" &&
        editTask?.status?.trim()!=="" &&
        editTask?.priority?.trim()!==""&&
        editTask.assignedTo &&
        editTask.projectId &&
        editTask.dueDate &&
        editTask.estimateDate


    const handleTaskInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEditTask((preTask) => ({ ...preTask, [name]: value }));
    }

    // engineer data
    const allEngineers = userData.users.filter((user) => {
        return user.role === "Engineer";
    })

    const handleEditTask = async () => {
        try {
            const response = await updateTask({
                variables: {
                    id:editTask.id,
                    title: editTask.title,
                    description: editTask.description,
                    assignedTo: editTask.assignedTo,
                    projectId: editTask.projectId,
                    status: editTask.status,
                    priority: editTask.priority,
                    dueDate: new Date(editTask.dueDate),
                    estimateDate: new Date(editTask.estimateDate),        
                }
            });

            if (response) {
                toast.success("Task has been updated successfully");
                setEditTask({
                    id:"",
                    title: "",
                    description: "",
                    projectId: "",
                    assignedTo: "",
                    status: "",
                    priority: "",
                    dueDate: "",
                    estimateDate: ""
                })
                handleClose();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <Box sx={{ padding: 2 }}>
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: 25, color: '#053348' }}>Edit Task</DialogTitle>
                <DialogContent>
                    <Stack spacing={1}>
                        <Box >
                            <FormLabel>Task Name *</FormLabel>
                            <TextField
                                fullWidth
                                required
                                name="title"
                                margin="normal"
                                value={editTask?.title}
                                onChange={handleTaskInputs}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Task Description *</FormLabel>
                            <TextField
                                fullWidth
                                required
                                name="description"
                                multiline
                                rows={4}
                                margin="normal"
                                value={editTask?.description}
                                onChange={handleTaskInputs}
                            />
                        </Box>
                        <FormControl fullWidth>
                            <FormLabel sx={{ mb: 1, mt: 2 }}>Project Name *</FormLabel>
                            <Select
                                name="projectId"
                                value={editTask.projectId}
                                onChange={handleTaskInputs}
                                required
                                displayEmpty
                            >
                                <MenuItem value="" disabled>Select Project</MenuItem>
                                {
                                    projectData?.projects?.map((project, index) => (
                                        <MenuItem value={project.id} key={project.id}>
                                            {index + 1}. {project.title}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel sx={{ mb: 1 }}>Assign To *</FormLabel>
                            <Select
                                name="assignedTo"
                                value={editTask?.assignedTo}
                                onChange={handleTaskInputs}
                                required
                                displayEmpty
                            >
                                <MenuItem value="" disabled>Select Engineer</MenuItem>
                                {allEngineers?.map((engineer) => (
                                    <MenuItem value={engineer.id}>
                                        {engineer.fullName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Stack direction={'row'} spacing={3} sx={{ marginTop: 3 }}>
                            <FormControl>
                                <FormLabel sx={{ mb: 1 }}>Status *</FormLabel>
                                <Select
                                    name="status"
                                    value={editTask?.status}
                                    onChange={handleTaskInputs}
                                    required
                                    displayEmpty
                                    sx={{ width: 250 }}
                                >
                                    <MenuItem value="" disabled>Select Status</MenuItem>
                                    <MenuItem value="Yet to be started">Yet to be started</MenuItem>
                                    <MenuItem value="In progress">In progress</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                    <MenuItem value="Delivered">Delivered</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel sx={{ mb: 1 }}>Priority *</FormLabel>
                                <Select
                                    name="priority"
                                    value={editTask?.priority}
                                    onChange={handleTaskInputs}
                                    required
                                    displayEmpty
                                    sx={{ width: 250 }}
                                >
                                    <MenuItem value="" disabled>Choose Priority</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="High">High</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack direction={'row'} spacing={3} sx={{ marginTop: 3 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack direction={'column'} spacing={0}>
                                    <FormLabel sx={{ mb: 1 }}>Due Date</FormLabel>
                                    <DatePicker
                                        fullWidth
                                        required
                                        type="date"
                                        name="startDate"
                                        margin="normal"
                                        value={editTask?.dueDate}
                                        onChange={(newValue) =>
                                            setEditTask({
                                                ...editTask,
                                                dueDate: newValue,
                                            })
                                        }
                                        slotProps={
                                            {
                                                textField: {
                                                    error: false
                                                }
                                            }
                                        }
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack direction={'column'} spacing={0} >
                                    <FormLabel sx={{ mb: 1 }}>Estimate Date</FormLabel>
                                    <DatePicker
                                        fullWidth
                                        required
                                        type="date"
                                        name="endDate"
                                        margin="normal"
                                        value={editTask?.estimateDate}
                                        onChange={(newValue) =>
                                            setEditTask({
                                                ...editTask,
                                                estimateDate: newValue,
                                            })
                                        }
                                        slotProps={
                                            {
                                                textField: {
                                                    error: false
                                                }
                                            }
                                        }
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <MyButton handler={handleClose} name="Cancel" />
                    <Button
                        sx={{ backgroundColor: '#053348', color: 'white' }}
                        onClick={handleEditTask}
                        disabled={!isValidTask}
                    >Edit</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default EditTaskModal;