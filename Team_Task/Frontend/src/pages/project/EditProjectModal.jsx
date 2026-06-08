import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Stack, FormControl, Box, FormLabel, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { GETUSERS, UPDATEPROJECT } from "../../query/query";
import { useMutation, useQuery } from "@apollo/client/react";
import MyButton from "../../common/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import LoadingCompo from "../../common/Loader";
import { toast } from "react-toastify";

const EditProjectModal = ({ open, handleClose, selectedProject }) => {
    const { loading, data } = useQuery(GETUSERS);
    const [updateProject] = useMutation(UPDATEPROJECT,
        {
            refetchQueries: ['getProjects']
        }
    );
    const [editProject, setEditProject] = useState({
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

    useEffect(() => {
        setEditProject(selectedProject)
    }, [selectedProject])

    if (loading) {
        return <LoadingCompo />
    }


    //input handler
    const handleProjectInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEditProject((preData) => ({ ...preData, [name]: value }));
    };

    //validation
    const validateProjectInputs = () => {
        const newError = {};
        if (!editProject.title || editProject.title.trim() === "") {
            newError.title = "Title field is required.";
        }
        if (!editProject.description || editProject.description.trim() === "") {
            newError.description = "Description field is required.";
        }
        if (!editProject.status || editProject.status.trim() === "") {
            newError.status = "Status field is required";
        }
        if (!editProject.priority) {
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
                    setEditProject((preData) => (
                        {
                            ...preData,
                            id: currProject.id,
                            title: currProject.title,
                            description: currProject.description,
                            projectManager: currProject.projectManager,
                            status: currProject.status,
                            priority: currProject.priority,
                            startDate: currProject.startDate,
                            endDate: currProject.endDate
                        }
                    ))
                }
            });
            const response = await updateProject({
                variables: {
                    id: editProject.id,
                    title: editProject.title,
                    description: editProject.description,
                    projectManager: editProject.projectManager,
                    engineers: editProject.engineers,
                    status: editProject.status,
                    priority: editProject.priority,
                    startDate: editProject.startDate,
                    endDate: editProject.endDate
                }
            });
            console.log(editProject.startDate);
            console.log(editProject.title);
            if (response) {
                setEditProject({
                    title: "",
                    description: "",
                    status: "",
                    priority: ""
                });
                handleClose()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //fetch project manager from user
    const projectManagerUser = data?.users?.filter((currUser) => {
        return currUser.role === 'Project Manager';
    });

    //fetch engineer from user
    const engineerUsers = data?.users?.filter((currUser) => {
        return currUser.role === 'Engineer';
    });

    // check validate
    const isValidProject =
        editProject?.title !== "" &&
        editProject?.description !== "" &&
        editProject?.status!== "" &&
        editProject?.priority !== "" &&
        editProject.engineers &&
        editProject.projectManager !== "" &&
        editProject.startDate &&
        editProject.endDate

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <Box sx={{ padding: 2 }}>
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: 25, color: '#053348' }}>Edit Existing Project</DialogTitle>
                <DialogContent>
                    <Stack spacing={1.5}>
                        <Box >
                            <FormLabel>Project Name *</FormLabel>
                            <TextField
                                fullWidth
                                required
                                name="title"
                                margin="normal"
                                value={editProject.title}
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
                                value={editProject.description}
                                onChange={handleProjectInputs}
                                error={error.description}
                                helperText={error.description ? error.description : ''}
                            />
                        </Box>
                        <FormControl fullWidth>
                            <FormLabel sx={{ mb: 1 }}>Project Manager *</FormLabel>
                            <Select
                                name="projectManager"
                                value={editProject.projectManager}
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
                                value={editProject.engineers || []}
                                onChange={handleProjectInputs}
                                required
                                displayEmpty
                                error={error.engineers}
                                helperText={error.engineers ? error.engineers : ''}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        {(selected || []).map((value) => {
                                            return <Typography key={value}>{value}</Typography>
                                        }
                                        )}
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
                                    value={editProject.status}
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
                                    value={editProject.priority}
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
                                        value={editProject.startDate}
                                        onChange={(newValue) =>
                                            setEditProject({
                                                ...editProject,
                                                startDate: newValue,
                                            })
                                        }
                                        onChange={handleProjectInputs}
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
                                        value={editProject.endDate}
                                        onChange={(newValue) =>
                                            setEditProject({
                                                ...editProject,
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
                    <Button onClick={handleEditProjectBTN} disabled={isValidProject} sx={{backgroundColor:'#053348', color:'white'}}>Edit</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
export default EditProjectModal