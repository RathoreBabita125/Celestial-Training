import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import '../dashboard/Dashboard.css'
import { useQuery } from '@apollo/client/react';
import DeleteForeverIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import CreateProjectModal from '../project/CreateProjectModal';
import DeleteProjectModal from '../project/DeleteProjectModal';
import ViewProjectModal from '../project/ViewProjectModal';
import MyButton from '../../common/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import EditProjectModal from '../project/EditProjectModal';
import LoadingCompo from '../../common/Loader';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterProjectModal from '../project/FilterProjectModal';
import { GETPROJECTS } from '../../query/project/GetProject';

const Project = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});
    const [selectDeleteID, setSelectDeleteID] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openFilter, setOpenFilter] = useState(false);

    const [filters, setFilter] = useState({
        title: '',
        status: '',
        priority: '',
        projectManager: ''
    })
    const { loading, data } = useQuery(GETPROJECTS);

    if (loading) {
        return <LoadingCompo />
    }

    const filteredProjects = (data?.projects || []).filter((project) => {
        const matchTitle = filters.title
            ? project.title?.toLowerCase().includes(filters.title.toLowerCase())
            : true;
        const matchStatus = filters.status
            ? project.status?.toLowerCase() === filters.status.toLowerCase()
            : true;
        const matchPriority = filters.priority
            ? project.priority?.toLowerCase() === filters.priority.toLowerCase()
            : true;
        const matchManager = filters.projectManager
            ? project.projectManager?.toLowerCase().includes(filters.projectManager.toLowerCase())
            : true;
        return matchTitle && matchStatus && matchPriority && matchManager;
    });

    const paginatedProjects = filteredProjects
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleViewProject = (project) => {
        setSelectedProject(project);
        setOpenView(true);
    };
    const handleCloseFilter = () => {
        setOpenFilter(false);
    }
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
                {!data?.project &&
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
                            <FilterProjectModal
                                open={openFilter}
                                onClose={handleCloseFilter}
                                setFilter={setFilter}
                                filters={filters}
                                setPage={setPage}
                                setOpenFilter={setOpenFilter}
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
                                                    <EditProjectModal
                                                        open={openEdit}
                                                        handleClose={handleCloseEdit}
                                                        selectedProject={selectedProject}
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
                                                    <DeleteProjectModal
                                                        open={openDelete}
                                                        handleClose={handleCloseDelete}
                                                        selectDeleteID={selectDeleteID}
                                                        setOpenDelete={setOpenDelete}
                                                    />
                                                    <RemoveRedEyeIcon
                                                        onClick={() => handleViewProject(currProject)}
                                                        sx={{ fontSize: 25, cursor: 'pointer' }}
                                                    />
                                                    <ViewProjectModal
                                                        open={openView}
                                                        handleClose={handleCloseView}
                                                        selectedProject={selectedProject}
                                                    />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                        <TablePagination
                            className='table-pagination'
                            component="div"
                            count={filteredProjects.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{ color: '#053348', fontWeight: 'bold' }}
                        />
                    </TableContainer>
                </Stack>
            </Box>
        </>
    )
}
export default Project;