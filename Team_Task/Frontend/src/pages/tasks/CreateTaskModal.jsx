import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Stack, FormControl, FormLabel, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { CREATETASK, GETUSERS } from "../../query/query";
import { useMutation, useQuery } from "@apollo/client/react";
import MyButton from "../../common/Button";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LoadingCompo from "../../common/Loader";
import { toast } from "react-toastify";

const CreateTaskModal = ({ open, handleClose }) => {
    const [createTask] = useMutation(CREATETASK,
        {
            refetchQueries: ['getProjects']
        }
    );
    const { loading, data } = useQuery(GETUSERS);
    
    const [task, setTask] = useState({
        title: '',
        description: '',
        assignedTo: [],
        projectName: [],
        status: '',
        priority: '',
        dueDate: '',
        estimateDate: ''
    });

    //loading data
    if (loading) {
        return <LoadingCompo />
    }

    const handleTaskInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setTask((preData) => ({ ...preData, [name]: value }));
    }

    // check validate
    const isValidProject =
        task?.title.trim() !== "" &&
        task?.description.trim()!=="" &&
        task?.assignedTo.trim()!=="" &&
        task.projectName.trim()!==""&&
        task?.priority.trim()!==""&&
        task?.status.trim()!==""&&
        task.dueDate &&
        task.estDate 

    // handle create project click
    const handleCreateProject = async () => {
        try {
            const response = await createTask({
                variables: {
                    title: task.title,
                    description: task.description,
                    assignedTo: task.assignedTo,
                    projectName: task.projectName,
                    priority: task.priority,
                    status: task.status,
                    dueDate: task.dueDate,
                    estDate: task.estDate,
                }
            });
            setTask({
                title: '',
                description: '',
                assignedTo: [],
                projectName: [],
                status: '',
                priority: '',
                dueDate: '',
                estimateDate: ''
            });

            if (response) {
                toast.success("Task has been successfully created.");
                handleClose();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        };
    };


    //fetch engineer from user
    const engineerUsers = data?.users?.filter((currUser) => {
        return currUser.role === 'Engineer';
    });
    console.log(engineerUsers)


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
                        <Box>
                            <FormLabel>Project Name *</FormLabel>
                            <TextField
                                fullWidth
                                required
                                name="projectName"
                                margin="normal"
                                value={task.description}
                                onChange={handleTaskInputs}
                            />
                        </Box>
                         <FormControl fullWidth>
                            <FormLabel sx={{ mb: 1, mt: 2 }}>Assign To *</FormLabel>
                            <Select
                                multiple
                                name="engineers"
                                value={task.engineers}
                                onChange={handleTaskInputs}
                                required
                                displayEmpty
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Typography key={value} >{value}</Typography>
                                        ))}
                                    </Box>
                                )}
                            >
                                <MenuItem value="" disabled>Select Engineers</MenuItem>
                                {
                                    engineerUsers?.map((currUser, index) => {
                                        return (
                                            <MenuItem value={currUser.fullName} key={currUser.id}>
                                                {index + 1}. {currUser.fullName}
                                            </MenuItem>
                                        )
                                    })
                                }
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
                                        value={task.startDate}
                                        onChange={(newValue) =>
                                            setTask({
                                                ...task,
                                                startDate: newValue,
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
                                        value={task.endDate}
                                        onChange={(newValue) =>
                                            setTask({
                                                ...task,
                                                endDate: newValue,
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
                    <Button onClick={handleCreateProject} disabled={!isValidProject} sx={{backgroundColor:'#053348', color:'white'}}>Add</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default CreateTaskModal;