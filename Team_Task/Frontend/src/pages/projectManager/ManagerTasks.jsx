import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import MyButton from '../../common/Button';
import CreateTaskModal from '../tasks/CreateTaskModal';
import '../dashboard/Dashboard.css'
import { GETTASKS } from '../../query/query';
import { useQuery } from '@apollo/client/react';
import LoadingCompo from '../../common/Loader';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/Delete';
import DeleteTaskModal from '../tasks/DeleteTaskModal';
import ViewTaskModal from '../tasks/ViewTaskModal';
import EditTaskModal from '../tasks/EditTaskModal';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter from '../filter/Filter';
import { FilterContext } from '../../context/FilterContext';

const ManagerTasks = () => {

    const { loading, data: taskData } = useQuery(GETTASKS);
    const [openAddTask, setOpenAddTask] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectDeleteID, setSelectDeleteID] = useState(null);
    const [openView, setOpenView] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    
    const { openFilter, setOpenFilter, handleCloseFilter, page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useContext(FilterContext);
    const [filter, setFilter] = useState({
        title: '',
        status: '',
        priority: '',
        assignedTo: '',
        project: '',
    })
    const COLUMN_OPTIONS = [
        { label: "Task Name", value: "title" },
        { label: "Status", value: "status" },
        { label: "Priority", value: "priority" },
        { label: "Engineer", value: "assignedTo" },
        { label: "Project", value: "project" },
    ];
    const filterField=["title", "status", "priority", "assignedTo", "project"];

    if (loading) {
        return <LoadingCompo />
    }

    const filteredTasks = (taskData?.tasks || []).filter((task) => {
        const matchTitle = filter.title
            ? task.title?.toLowerCase().includes(filter.title.toLowerCase())
            : true;
        const matchStatus = filter.status
            ? task.status?.toLowerCase() === filter.status.toLowerCase()
            : true;
        const matchPriority = filter.priority
            ? task.priority?.toLowerCase() === filter.priority.toLowerCase()
            : true;
        const matchEmployee = filter.assignedTo.fullName
            ? task.assignedTo?.fullName?.toLowerCase().includes(filter.assignedTo.fullName?.toLowerCase())
            : true;
        const matchProject = filter.project.title
            ? task.project.title?.toLowerCase().includes(filter.project.title.toLowerCase())
            : true;
        return matchTitle && matchStatus && matchPriority && matchEmployee && matchProject;
    });

    const handleCloseOpenTask = () => {
        setOpenAddTask(false);
    }
    const handleCloseDelete = () => {
        setOpenDelete(false);
    }
    const handleCloseView = () => {
        setOpenView(false);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const paginatedProjects = filteredTasks
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <Box className="project-section">
                {
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                        <Typography variant="h4" color="initial" sx={{ fontWeight: 'bold', color: '#053348' }}>Create and assign task</Typography>
                        <Stack direction={'row'} spacing={3}>
                            <MyButton name="Add Task" handler={() => setOpenAddTask(true)} />
                            <CreateTaskModal
                                open={openAddTask}
                                handleClose={handleCloseOpenTask}
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
                                columnOptions={COLUMN_OPTIONS}
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
                                    <TableCell className='user-table-column' align='center'>Task ID</TableCell>
                                    <TableCell className='user-table-column' align='center'>Task Name</TableCell>
                                    <TableCell className='user-table-column' align='center'>Description</TableCell>
                                    <TableCell className='user-table-column' align='center'>Project</TableCell>
                                    <TableCell className='user-table-column' align='center'>Assign To</TableCell>
                                    <TableCell className='user-table-column' align='center'>Due Date</TableCell>
                                    <TableCell className='user-table-column' align='center'>Estimate Time</TableCell>
                                    <TableCell className='user-table-column' align='center'>Status</TableCell>
                                    <TableCell className='user-table-column' align='center'>Priority</TableCell>
                                    <TableCell className='user-table-column' align='center'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className='project-table-body'>
                                {
                                    paginatedProjects?.map((currTask) => {
                                        return <TableRow key={currTask.id}>
                                            <TableCell className='team-table-row' align='center'>
                                                {currTask.id}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currTask.title}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currTask?.description?.split(" ").slice(0, 3).join(" ")}
                                                {currTask?.description?.split(" ").length > 3 && "..."}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currTask?.project?.title}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currTask?.assignedTo?.fullName}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currTask?.dueDate}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currTask?.estimateDate}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currTask?.status}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                {currTask?.priority}
                                            </TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                <Stack direction={'row'} spacing={2}>
                                                    <EditSquareIcon
                                                        sx={{ fontSize: 25, cursor: 'pointer', color: '#053348' }}
                                                        onClick={() => {
                                                            setOpenEdit(true);
                                                            setSelectedTask(currTask);
                                                        }}
                                                    />
                                                    <EditTaskModal
                                                        open={openEdit}
                                                        handleClose={handleCloseEdit}
                                                        selectedTask={selectedTask}
                                                    />
                                                    <DeleteForeverIcon
                                                        sx={{ fontSize: 25, cursor: 'pointer' }}
                                                        onClick={
                                                            () => {
                                                                setOpenDelete(true);
                                                                setSelectDeleteID(currTask.id);
                                                            }
                                                        }
                                                    />
                                                    <DeleteTaskModal
                                                        open={openDelete}
                                                        handleClose={handleCloseDelete}
                                                        selectDeleteID={selectDeleteID}
                                                        setOpenDelete={setOpenDelete}
                                                    />
                                                    <RemoveRedEyeIcon
                                                        onClick={() => {
                                                            setSelectedTask(currTask);
                                                            setOpenView(true);
                                                        }}
                                                        sx={{ fontSize: 25, cursor: 'pointer' }}
                                                    />
                                                    <ViewTaskModal
                                                        open={openView}
                                                        handleClose={handleCloseView}
                                                        selectedTask={selectedTask}
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
                            count={filteredTasks.length}
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
export default ManagerTasks;