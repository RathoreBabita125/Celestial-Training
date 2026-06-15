import { Box, Button, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { GETPROJECTDETAILS } from "../../query/project/GetProjectDetails";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loader";
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter from "../filter/Filter";
import { useContext, useState } from "react";
import { FilterContext } from "../../context/FilterContext";

const ManagerProjects = () => {

    const { loading: projectDetailsLoading, data: projectDetails } = useQuery(GETPROJECTDETAILS);
    const { openFilter, setOpenFilter, handleCloseFilter, page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useContext(FilterContext);
    const [filter, setFilter] = useState({
        title: '',
        projectManager: '',
        status: '',
        priority: '',
    })
    const COLUMN_OPTIONS = [
        { label: "Project Name", value: "title" },
        { label: "Project Manager", value: "projectManager" },
        { label: "Status", value: "status" },
        { label: "Priority", value: "priority" },
    ];
    const filterField = ["title", "projectManager", "Priority", "status"];
    if (projectDetailsLoading) return <LoadingCompo />

    const filteredTasks = (projectDetails.getProjectDetails).filter((detail) => {
        const matchTitle = filter.title
            ? detail.title?.toLowerCase().includes(filter.title.toLowerCase())
            : true;
        const matchProjectManager = filter.projectManager
            ? detail.projectManager?.toLowerCase().includes(filter.projectManager.toLowerCase())
            : true;
        const matchStatus = filter.status
            ? detail.status?.toLowerCase() === filter.status.toLowerCase()
            : true;
        const matchPriority = filter.priority
            ? detail.priority?.toLowerCase() === filter.priority.toLowerCase()
            : true;
        return matchTitle && matchStatus && matchPriority && matchProjectManager
    });

    const paginatedProjects = filteredTasks
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                <Typography variant="h4" color="initial" sx={{ fontWeight: 'bold', color: '#053348' }}>Projects and Tasks Details</Typography>
                <Stack direction={'row'} spacing={3}>
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
            <Table className='project-table' sx={{ marginTop: 5 }}>
                <TableHead>
                    <TableRow className='dash-user-coloumn'>
                        <TableCell className='user-table-column' align='center'>Project ID</TableCell>
                        <TableCell className='user-table-column' align='center'>Project Name</TableCell>
                        <TableCell className='user-table-column' align='center'>Project Manager</TableCell>
                        <TableCell className='user-table-column' align='center'>Priority</TableCell>
                        <TableCell className='user-table-column' align='center'>Total Tasks</TableCell>
                        <TableCell className='user-table-column' align='center'>Completed Tasks</TableCell>
                        <TableCell className='user-table-column' align='center'>Active Tasks</TableCell>
                        <TableCell className='user-table-column' align='center'>Deadline</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className='project-table-body'>
                    {
                        paginatedProjects?.map((currProject) => {
                            return <TableRow >
                                <TableCell className='team-table-row' align='center'>{currProject.id} </TableCell>
                                <TableCell className='team-table-row' align='center'>{currProject.title} </TableCell>
                                <TableCell className='team-table-row' align='center'>{currProject.projectManager} </TableCell>
                                <TableCell className='team-table-row' align='center'>{currProject.priority} </TableCell>
                                <TableCell className='team-table-row' align='center'>{currProject.tasks.length} </TableCell>
                                <TableCell className='team-table-row' align='center'>
                                    {currProject.tasks.filter(
                                        (currTask) => {
                                            return currTask.status === 'Completed'
                                        }
                                    ).length}
                                </TableCell>
                                <TableCell className='team-table-row' align='center'>
                                    {currProject.tasks.filter(
                                        (currTask) => {
                                            return currTask.status === 'In progress'
                                        }
                                    ).length}
                                </TableCell>
                                <TableCell className='team-table-row' align='center'>{currProject.endDate} </TableCell>
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
        </Box>
    )
}
export default ManagerProjects;
