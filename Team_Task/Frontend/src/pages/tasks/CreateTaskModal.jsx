import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Stack, FormControl, FormLabel, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import MyButton from "../../common/Button";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useMutation, useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loader";
import { toast } from "react-toastify";
import { GETUSERS } from "../../query/user/GetUser";
import { CREATETASK } from "../../query/task/AddTask";
import { GETPROJECTS } from "../../query/project/GetProject";

const CreateTaskModal = ({ open, handleClose }) => {

    const [createTask] = useMutation(CREATETASK,{
        refetchQueries:['getTasks']
    });
    const [task, setTask] = useState({
        title: "",
        description: "",
        projectId: "",
        assignedTo: "",
        status: "",
        priority: "",
        dueDate: "",
        estimateDate: ""
    });
    const { loading: userLoading, data: userData } = useQuery(GETUSERS);
    const { loading: projectLoading, data: projectData } = useQuery(GETPROJECTS);

    if (userLoading || projectLoading) {
        return <LoadingCompo />
    }

    const handleTaskInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setTask((preTask) => ({ ...preTask, [name]: value }));
    }

    //validate 
    const isValidTask =
        task?.title.trim() !== "" &&
        task?.description.trim()!=="" &&
        task?.status.trim()!=="" &&
        task?.priority.trim()!==""&&
        task.assignedTo &&
        task.projectId &&
        task.dueDate &&
        task.estimateDate

    // engineer profile data
    const allEngineers = userData.users.filter((user) => {
        return user.role === "Engineer";
    })

    const addTaskHandler = async () => {
        try {
            const response = createTask({
                variables: {
                    title: task.title,
                    description: task.description,
                    assignedTo: task.assignedTo,
                    projectId: task.projectId,
                    status: task.status,
                    priority: task.priority,
                    dueDate: task.dueDate,
                    estimateDate: task.estimateDate
                }
            });

            if (response) {
                toast.success("Task has been created successfully");
                setTask({
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
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: 25, color: '#053348' }}>Add Task</DialogTitle>
                <DialogContent>
                    <Stack spacing={1}>
                        <Box >
                            <FormLabel>Task Name *</FormLabel>
                            <TextField
                                fullWidth
                                required
                                name="title"
                                margin="normal"
                                value={task.title}
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
                                value={task.description}
                                onChange={handleTaskInputs}
                            />
                        </Box>
                        <FormControl fullWidth>
                            <FormLabel sx={{ mb: 1, mt: 2 }}>Project Name *</FormLabel>
                            <Select
                                name="projectId"
                                value={task.projectName}
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
                            <FormLabel sx={{ mb: 1, mt: 2 }}>Assign To *</FormLabel>
                            <Select
                                name="assignedTo"
                                value={task.assignedTo}
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
                                    value={task.status}
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
                                    value={task.priority}
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
                                        value={task.dueDate}
                                        onChange={(newValue) =>
                                            setTask({
                                                ...task,
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
                                        value={task.estimateDate}
                                        onChange={(newValue) =>
                                            setTask({
                                                ...task,
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
                        onClick={addTaskHandler}
                        disabled={!isValidTask}
                    >Add</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default CreateTaskModal;