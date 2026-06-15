import { Box, Button, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loader";
import FilterListIcon from '@mui/icons-material/FilterList';
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { FilterContext } from "../../context/FilterContext";
import ViewTask from "./ViewTask";
import { GETTASKS } from "../../query/task/GetTask";
import Filter from "../filter/Filter";

const EngineerTask = () => {
    const[openView, setOpenView]=useState(false);
    const[selectMyTask, setSelectMyTask]=useState(null);
    const {userAuth} = useContext(AuthContext);
    const { openFilter, setOpenFilter, handleCloseFilter, page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useContext(FilterContext); 
    const [filter, setFilter] = useState({
        title:'',
        status:'',
        priority:'',
    })
    const { loading: taskLoading, data: taskData } = useQuery(GETTASKS); 
    const COLUMN_OPTIONS = [
        { label: "Task Name", value: "title" },
        { label: "Status", value: "status" },
        { label: "Priority", value: "priority" },
    ];
    const filterField=["title","status","priority"];
    
    if (taskLoading) return <LoadingCompo />

    console.log(taskData);

    const myAllTask=taskData?.tasks?.filter((currTask)=>{
        return currTask.assignedTo.id===userAuth.id;
    })

    const handleViewClose=()=>{
        setOpenView(false);
    }

    return (
        <Box sx={{width:"65vw"}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                <Typography variant="h4" color="initial" sx={{ fontWeight: 'bold', color: '#053348' }}>Tasks Details</Typography>
                <Stack direction={'row'} spacing={2}>        
                    {/* <Stack direction={'row'} spacing={3}>
                        <Button sx={{ gap: 2, backgroundColor: '#053348', color: 'white' }}
                            onClick={()=>setOpenFilter(true)}
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
                    </Stack> */}
                </Stack>
            </Box>
            <Table className='project-table' sx={{ marginTop: 5 }}>
                <TableHead>
                    <TableRow className='dash-user-coloumn'>
                        <TableCell className='user-table-column' align='center'>Task ID</TableCell>
                        <TableCell className='user-table-column' align='center'>Task Name</TableCell>
                        <TableCell className='user-table-column' align='center'>Description</TableCell>
                        <TableCell className='user-table-column' align='center'>Project</TableCell>
                        <TableCell className='user-table-column' align='center'>Priority</TableCell>
                        <TableCell className='user-table-column' align='center'>Status</TableCell>
                        <TableCell className='user-table-column' align='center'>Deadline</TableCell>
                        <TableCell className='user-table-column' align='center'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className='project-table-body'>
                    {
                        myAllTask?.map((myTask) => {
                            return <TableRow key={myTask.id}>
                                <TableCell className='team-table-row' align='center'>{myTask.id} </TableCell>
                                <TableCell className='team-table-row' align='center'>{myTask.title} </TableCell>
                                <TableCell className='team-table-row' align='center'>{myTask.description} </TableCell>
                                <TableCell className='team-table-row' align='center'>{myTask.project?.title} </TableCell>
                                <TableCell className='team-table-row' align='center'>{myTask.priority} </TableCell>
                                <TableCell className='team-table-row' align='center'>{myTask.status} </TableCell>
                                <TableCell className='team-table-row' align='center'>{myTask.dueDate} </TableCell>
                                <TableCell className='team-table-row' align='center'>
                                    <RemoveRedEyeIcon onClick={
                                        ()=>{
                                            setOpenView(true);
                                            setSelectMyTask(myTask)
                                        }
                                    }/>
                                    <ViewTask
                                        open={openView}
                                        handleClose={handleViewClose}
                                        myTask={selectMyTask}
                                    />
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
            <TablePagination
                className='table-pagination'
                component="div"
                count={myAllTask.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ color: '#053348', fontWeight: 'bold' }}
            />
        </Box>
    )
}
export default EngineerTask;
