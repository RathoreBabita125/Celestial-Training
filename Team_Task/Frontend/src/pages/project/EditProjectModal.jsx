import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Stack, FormControl, Box, FormLabel, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GETPROJECTS, UPDATEPROJECT } from "../../query/query";
import { useMutation, useQuery } from "@apollo/client/react";
import MyButton from "../../common/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import LoadingCompo from "../../common/Loader";
import { toast } from "react-toastify";

const EditProjectModal = ({ open, handleClose, setSuccessEditOpen, selectedProject }) => {
    const { loading, data } = useQuery(GETPROJECTS);
    const [updateProject] = useMutation(UPDATEPROJECT);
    const [editproject, setEditProject] = useState({
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

    if (loading) {
        return <LoadingCompo />
    }

    useEffect(() => {
        setEditProject(selectedProject)
    }, [selectedProject])

    //input handler
    const handleProjectInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEditProject((preData) => ({ ...preData, [name]: value }));
    };

    //validation
    const validateProjectInputs = () => {
        const newError = {};
        if (!editproject.title || editproject.title.trim() === "") {
            newError.title = "Title field is required.";
        }
        if (!editproject.description || editproject.description.trim() === "") {
            newError.description = "Description field is required.";
        }
        if (!editproject.status || editproject.status.trim() === "") {
            newError.status = "Status field is required";
        }
        if (!editproject.priority) {
            newError.status = "Priority field is required";
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    }

    //handle edit button
    const handleEditProjectBTN = async () => {
        const validateInputs = validateProjectInputs();
        if (!validateInputs) {
            throw new Error("Enter valid details");
        }
        try {
            data?.projects?.filter((currProject) => {
                if (currProject.id === selectedProject.id) {
                    setEditProject((preData) => ({ ...preData, id: currProject.id, title: currProject.title, description: currProject.description, status: currProject.status }))
                }
            });
            const response = await updateProject({
                variables: {
                    id: editproject.id,
                    userId: editproject.user.id,
                    projectId: editproject.project.id,
                    title: editproject.title,
                    description: editproject.description,
                    status: editproject.status
                }
            });
            if (response) {
                setSuccessEditOpen(false);
                console.log(response);
                editproject({
                    title: "",
                    description: "",
                    status: "",
                    priority: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

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
                                value={editproject.title}
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
                                value={editproject.description}
                                onChange={handleProjectInputs}
                                error={error.description}
                                helperText={error.description ? error.description : ''}
                            />
                        </Box>
                        <FormControl fullWidth>
                            <FormLabel sx={{ mb: 1 }}>Project Manager *</FormLabel>
                            <Select
                                name="projectManager"
                                value={editproject.projectManager}
                                onChange={handleProjectInputs}
                                required
                                fontWeight
                                displayEmpty
                            >
                                <MenuItem value="" disabled>Select Propject Manager</MenuItem>
                                {
                                    data?.projects?.map((currUser) => {
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
                                value={editproject.engineers}
                                onChange={handleProjectInputs}
                                required
                                displayEmpty
                                error={error.engineers}
                                helperText={error.engineers ? error.engineers : ''}
                                renderValue={(selected) => (

                                    console.log("selected =", editproject),


                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Typography key={value} sx={{ fontSize: 20 }}>{value}</Typography>
                                        ))}
                                    </Box>
                                )}
                            >
                                <MenuItem value="" disabled>Select Engineers</MenuItem>
                                {
                                    data?.projects?.map((currUser, index) => {
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
                                    value={editproject.status}
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
                                    value={editproject.priority}
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
                                        value={editproject.startDate}
                                        onChange={(newValue) =>
                                            setEditProject({
                                                ...editproject,
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
                                        value={editproject.endDate}
                                        onChange={(newValue) =>
                                            setEditProject({
                                                ...editproject,
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
                    <MyButton handler={handleEditProjectBTN} name="Create" />
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default EditProjectModal