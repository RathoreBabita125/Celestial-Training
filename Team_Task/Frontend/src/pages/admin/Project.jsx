import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import '../dashboard/Dashboard.css'
import { useQuery } from '@apollo/client/react';
import DeleteForeverIcon from '@mui/icons-material/Delete';
import { useContext, useState } from 'react';
import CreateProjectModal from '../project/CreateProjectModal';
import DeleteProjectModal from '../project/DeleteProjectModal';
import ViewProjectModal from '../project/ViewProjectModal';
import MyButton from '../../common/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import EditProjectModal from '../project/EditProjectModal';
import LoadingCompo from '../../common/Loader';
import FilterListIcon from '@mui/icons-material/FilterList';
import { GETPROJECTS } from '../../query/project/GetProject';
import Filter from '../filter/Filter';
import { FilterContext } from '../../context/FilterContext';

const Project = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});
    const [selectDeleteID, setSelectDeleteID] = useState(null);
    const {
        openFilter,
        setOpenFilter,
        handleCloseFilter,
        page,
        setPage,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage } = useContext(FilterContext);

    const [filter, setFilter] = useState({
        title: '',
        status: '',
        priority: '',
        projectManager: ''
    })
    // const { loading, data:projectData } = useQuery(GETPROJECTS);
    const { loading, data: projectData, error } = useQuery(GETPROJECTS);
    console.log(projectData);
    console.log("GETPROJECTS error:", error);
    if (loading) {
        return <LoadingCompo />
    }
    console.log(projectData?.projects);

    const columnOptions = [
        { label: "Project Name", value: "title" },
        { label: "Status", value: "status" },
        { label: "Priority", value: "priority" },
        { label: "Project Manager", value: "projectManager" },
    ];
    const filterField = ["projectName", "status", "priority", "projectManager"]



    const filteredProjects = (projectData?.projects || []).filter((project) => {
        const matchTitle = filter.title
            ? project.title?.toLowerCase().includes(filter.title.toLowerCase())
            : true;
        const matchStatus = filter.status
            ? project.status?.toLowerCase() === filter.status.toLowerCase()
            : true;
        const matchPriority = filter.priority
            ? project.priority?.toLowerCase() === filter.priority.toLowerCase()
            : true;
        const matchManager = filter.projectManager
            ? project.projectManager?.toLowerCase().includes(filter.projectManager.toLowerCase())
            : true;
        return matchTitle && matchStatus && matchPriority && matchManager;
    }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    const paginatedProjects = filteredProjects
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleViewProject = (project) => {
        setSelectedProject(project);
        setOpenView(true);
    };
    const handleCloseView = () => {
        setOpenView(false);
    };
    const handleClose = () => {
        setOpenCreate(false);
    }
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false)
    }
    return (
        <>
            <Box className="project-section">
                {projectData?.projects &&
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                        <Typography variant="h4" color="initial" sx={{ fontWeight: 'bold', color: '#053348' }}>All Project Details</Typography>
                        <Stack direction={'row'} spacing={3}>
                            <MyButton name="Add Project" handler={() => setOpenCreate(true)} />
                            <CreateProjectModal
                                open={openCreate}
                                handleClose={handleClose}
                            />
                            <Button sx={{ gap: 2, backgroundColor: '#053348', color: 'white' }}
                                onClick={() => setOpenFilter(true)}
                            >
                                <FilterListIcon />
                                Filter
                            </Button>

                            <Filter
                                open={openFilter}
                                onClose={handleCloseFilter}
                                setOpenFilter={setOpenFilter}
                                setFilter={setFilter}
                                setPage={setPage}
                                filter={filter}
                                columnOptions={columnOptions}
                                filterField={filterField}
                            />
                        </Stack>
                    </Box>
                }
                <Stack>
                    <TableContainer component={Paper} sx={{ maxWidth: 1500, margin: '50px auto' }}>
                        <Table className='project-table'>
                            <TableHead>
                                <TableRow className='dash-user-coloumn'>
                                    <TableCell className='user-table-column' align='center'>Project ID</TableCell>
                                    <TableCell className='user-table-column' align='center'>Project Name</TableCell>
                                    <TableCell className='user-table-column' align='center'>Description</TableCell>
                                    <TableCell className='user-table-column' align='center'>Project Manager</TableCell>
                                    <TableCell className='user-table-column' align='center'>Engineer</TableCell>
                                    <TableCell className='user-table-column' align='center'>Status</TableCell>
                                    <TableCell className='user-table-column' align='center'>Priority</TableCell>
                                    <TableCell className='user-table-column' align='center'>Start Date</TableCell>
                                    <TableCell className='user-table-column' align='center'>End Date</TableCell>
                                    <TableCell className='user-table-column' align='center'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className='project-table-body'>
                                {
                                    paginatedProjects.map((currProject) => {
                                        return <TableRow key={currProject.id}>
                                            <TableCell className='team-table-row' align='center'>
                                                {currProject.id}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currProject.title}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currProject.description?.split(" ").slice(0, 3).join(" ")}
                                                {currProject.description?.split(" ").length > 3 && "..."}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currProject.projectManager}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {
                                                    Array.isArray(currProject.engineers) ?
                                                        currProject.engineers.map((engineer, index) => (
                                                            <Typography key={index}>{engineer}</Typography>
                                                        )) : currProject.engineer
                                                }
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currProject.status}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currProject.priority}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currProject.startDate}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currProject.endDate}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                <Stack direction={'row'} spacing={2}>
                                                    <EditSquareIcon
                                                        sx={{ fontSize: 25, cursor: 'pointer', color: '#053348' }}
                                                        onClick={() => {
                                                            setOpenEdit(true);
                                                            setSelectedProject(currProject);
                                                        }}
                                                    />
                                                    <DeleteForeverIcon
                                                        sx={{ fontSize: 25, cursor: 'pointer' }}
                                                        onClick={
                                                            () => {
                                                                setOpenDelete(true);
                                                                setSelectDeleteID(currProject.id);
                                                            }
                                                        }
                                                    />
                                                    <RemoveRedEyeIcon
                                                        onClick={() => handleViewProject(currProject)}
                                                        sx={{ fontSize: 25, cursor: 'pointer' }}
                                                    />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                        <EditProjectModal
                            open={openEdit}
                            handleClose={handleCloseEdit}
                            selectedProject={selectedProject}
                        />
                        <DeleteProjectModal
                            open={openDelete}
                            handleClose={handleCloseDelete}
                            selectDeleteID={selectDeleteID}
                            setOpenDelete={setOpenDelete}
                        />
                        <ViewProjectModal
                            open={openView}
                            handleClose={handleCloseView}
                            selectedProject={selectedProject}
                        />
                        <TablePagination
                            className='table-pagination'
                            component="div"
                            count={filteredProjects.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[10, 20, 30, 40]}
                            sx={{ color: '#053348', fontWeight: 'bold' }}
                        />
                    </TableContainer>
                </Stack>
            </Box>
        </>
    )
}
export default Project;