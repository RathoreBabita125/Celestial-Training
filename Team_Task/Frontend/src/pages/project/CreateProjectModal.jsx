import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Stack, FormControl, FormLabel, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { CREATEPROJECT, GETUSERS } from "../../query/query";
import { useMutation, useQuery } from "@apollo/client/react";
import MyButton from "../../common/Button";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LoadingCompo from "../../common/Loader";
import { toast } from "react-toastify";

const CreateProjectModal = ({ open, handleClose }) => {
    const [createProject] = useMutation(CREATEPROJECT,
        {
            refetchQueries: ['getProjects']
        }
    );
    const { loading, data } = useQuery(GETUSERS);
    const [project, setProject] = useState({
        title: '',
        projectManager: '',
        engineers: [],
        description: '',
        status: '',
        priority: '',
        startDate: '',
        endDate: ''
    });
    const [error, setError] = useState({
        title: '',
        description: '',
        status: '',
        priority: '',
    });
    const handleProjectInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setProject((preData) => ({ ...preData, [name]: value }));
    }

    //validation
    const validateProjectInputs = () => {
        const newError = {};
        if (!project.title || project.title.trim() === "") {
            newError.title = "Project name field is required.";
        }
        if (!project.description || project.description.trim() === "") {
            newError.description = "Description field is required.";
        }
        if (!project.status || project.status.trim() === "") {
            newError.status = "Status field is required";
        }
        if (!project.priority) {
            newError.status = "Priority field is required";
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    }

    // check validate
    const isValidProject =
        project?.title.trim() !== "" &&
        project?.description.trim()!=="" &&
        project?.status.trim()!=="" &&
        project?.priority.trim()!==""&&
        project.engineers &&
        project.projectManager.trim()!==""&&
        project.startDate &&
        project.endDate
        
    // handle create project click
    const handleCreateProject = async () => {
        const checkValidate = validateProjectInputs();
        if (!checkValidate) {
            throw new Error("Please fill all required field.");
        }
        try {
            const response = await createProject({
                variables: {
                    title: project.title,
                    description: project.description,
                    projectManager: project.projectManager,
                    engineers: project.engineers,
                    status: project.status,
                    priority: project.priority,
                    startDate: project.startDate,
                    endDate: project.endDate,
                }
            });
            setProject({
                title: '',
                projectManager: '',
                engineers: [],
                description: '',
                status: '',
                priority: '',
                startDate: '',
                endDate: ''
            });
            if (response) {
                toast.success("Project has been successfully created.");
                handleClose();
            }
        } catch (error) {
            toast.error(error.message);
        };
    };

    //loading data
    if (loading) {
        return <LoadingCompo />
    }

    //fetch project manager from user
    const projectManagerUser = data?.users?.filter((currUser) => {
        return currUser.role === 'Project Manager';
    });

    //fetch engineer from user
    const engineerUsers = data?.users?.filter((currUser) => {
        return currUser.role === 'Engineer';
    });

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <Box sx={{ padding: 2 }}>
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: 25, color: '#053348' }}>Create Project</DialogTitle>
                <DialogContent>
                    <Stack spacing={1.5}>
                        <Box >
                            <FormLabel>Project Name *</FormLabel>
                            <TextField
                                fullWidth
                                required
                                name="title"
                                margin="normal"
                                value={project.title}
                                onChange={handleProjectInputs}
                                error={error.title}
                                helperText={error.title ? error.title : ''}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Project Description *</FormLabel>
                            <TextField
                                fullWidth
                                required
                                name="description"
                                multiline
                                rows={4}
                                margin="normal"
                                value={project.description}
                                onChange={handleProjectInputs}
                                error={error.description}
                                helperText={error.description ? error.description : ''}
                            />
                        </Box>
                        <FormControl fullWidth>
                            <FormLabel sx={{ mb: 1 }}>Project Manager *</FormLabel>
                            <Select
                                name="projectManager"
                                value={project.projectManager}
                                onChange={handleProjectInputs}
                                required
                                fontWeight
                                displayEmpty
                            >
                                <MenuItem value="" disabled>Select Propject Manager</MenuItem>
                                {
                                    projectManagerUser?.map((currUser) => {
                                        return (
                                            <MenuItem value={currUser.fullName} key={currUser.id}>
                                                {currUser.fullName}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <FormLabel sx={{ mb: 1, mt: 2 }}>Engineers *</FormLabel>
                            <Select
                                multiple
                                name="engineers"
                                value={project.engineers}
                                onChange={handleProjectInputs}
                                required
                                displayEmpty
                                error={error.engineers}
                                helperText={error.engineers ? error.engineers : ''}
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
                                    value={project.status}
                                    onChange={handleProjectInputs}
                                    required
                                    displayEmpty
                                    sx={{ width: 250 }}
                                    error={error.status}
                                    helperText={error.status ? error.status : ''}
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
                                    value={project.priority}
                                    onChange={handleProjectInputs}
                                    required
                                    displayEmpty
                                    sx={{ width: 250 }}
                                    error={error.priority}
                                    helperText={error.priority ? error.priority : ''}
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
                                    <FormLabel sx={{ mb: 1 }}>Start Date</FormLabel>
                                    <DatePicker
                                        fullWidth
                                        required
                                        type="date"
                                        name="startDate"
                                        margin="normal"
                                        value={project.startDate}
                                        onChange={(newValue) =>
                                            setProject({
                                                ...project,
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
                                    <FormLabel sx={{ mb: 1 }}>End Date</FormLabel>
                                    <DatePicker
                                        fullWidth
                                        required
                                        type="date"
                                        name="endDate"
                                        margin="normal"
                                        value={project.endDate}
                                        onChange={(newValue) =>
                                            setProject({
                                                ...project,
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
                    <Button onClick={handleCreateProject} disabled={!isValidProject} sx={{backgroundColor:'#053348', color:'white'}}>Create</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default CreateProjectModal