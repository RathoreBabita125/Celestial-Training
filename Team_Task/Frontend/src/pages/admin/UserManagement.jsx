import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { useQuery } from '@apollo/client/react';
import { Button, TablePagination } from '@mui/material';
import { useContext, useState } from 'react';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import MyButton from '../../common/Button';
import LoadingCompo from '../../common/Loader';
import AddUser from '../members/AddUser';
import UpdateUser from '../members/UpdateUser';
import DeleteUser from '../members/DeleteUser';
import Filter from '../filter/Filter';
import { FilterContext } from '../../context/FilterContext';
import { GETUSERS } from '../../query/user/GetUser';

const UserManagement = () => {

    const { loading, data } = useQuery(GETUSERS);
    const [openUser, setOpenUser] = useState(false);
    const [openUpdateUser, setOPenUpdateUser] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [userEdit, setUserEdit] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);
    const { openFilter, setOpenFilter, handleCloseFilter, page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useContext(FilterContext);
    const [filter, setFilter] = useState({
        fullName: "",
        email: "",
        role: "",
        status: "",
    });
    const COLUMN_OPTIONS = [
        { label: "Name", value: "fullName" },
        { label: "Email", value: "email" },
        { label: "Role", value: "role" },
        { label: "Status", value: "status" },
    ];
    const filterField = ["fullName", "email", "role", "status"];

    if (loading) {
        return <LoadingCompo />
    }

    const filteredUsers = (data?.users || []).filter((user) => {
        const matchName = filter.fullName
            ? user.fullName?.toLowerCase().includes(filter.fullName.toLowerCase())
            : true;
        const matchEmail = filter.email
            ? user.email?.toLowerCase().includes(filter.email.toLowerCase())
            : true;
        const matchRole = filter.role
            ? user.role?.toLowerCase().includes(filter.role.toLowerCase())
            : true;
        const matchStatus = filter.status
            ? user.status?.toLowerCase().includes(filter.status.toLowerCase())
            : true;
        return matchName && matchEmail && matchRole && matchStatus;
    })?.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    const paginatedUsers = filteredUsers
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    const handleCloseUser = () => {
        setOpenUser(false);
    };

    const handleCloseUpdate = () => {
        setOPenUpdateUser(false)
    };
    const handleDeleteClose = () => {
        setOpenDelete(false);
    };

    return (
        <>
            <Box className="dash-teamuser-section">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                    <Typography variant="h4" color="initial" sx={{ fontWeight: 'bold', color: '#053348' }}>All Team members are here</Typography>
                    <Stack direction={'row'} spacing={3}>
                        <MyButton name="Add Member" handler={() => setOpenUser(true)} />
                        <AddUser
                            open={openUser}
                            handleClose={handleCloseUser}
                            setOpenUser={setOpenUser}
                        />
                        <Button
                            sx={{ gap: 2, backgroundColor: '#053348', color: 'white' }}
                            onClick={() => setOpenFilter(true)}
                        >
                            <FilterListIcon />
                            Filter
                        </Button>
                    </Stack>
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
                </Box>
                <Stack>
                    <TableContainer component={Paper} sx={{ maxWidth: 1500, margin: '50px auto' }}>
                        <Table aria-label="user data">
                            <TableHead>
                                <TableRow className='dash-user-coloumn'>
                                    <TableCell className='user-table-column' align='center'>ID</TableCell>
                                    <TableCell className='user-table-column' align='center'>Name</TableCell>
                                    <TableCell className='user-table-column' align='center'>Email</TableCell>
                                    <TableCell className='user-table-column' align='center'>Phone</TableCell>
                                    <TableCell className='user-table-column' align='center'>Role</TableCell>
                                    <TableCell className='user-table-column' align='center'>Status</TableCell>
                                    <TableCell className='user-table-column' align='center'>CreatedAt</TableCell>
                                    <TableCell className='user-table-column' align='center'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    paginatedUsers.map((currUser) => {
                                        return (<TableRow key={currUser.id}>
                                            <TableCell className='team-table-row' align='center'>{currUser.id}</TableCell>
                                            <TableCell className='team-table-row' align='center'>{currUser.fullName}</TableCell>
                                            <TableCell className='team-table-row' align='center'>{currUser.email}</TableCell>
                                            <TableCell className='team-table-row' align='center'>{currUser.phone}</TableCell>
                                            <TableCell className='team-table-row' align='center'>{currUser.role}</TableCell>
                                            <TableCell className='team-table-row' align='center'>{currUser.status}</TableCell>
                                            <TableCell className='team-table-row' align='center'>{new Date(currUser.createdAt).toLocaleString([], {
                                                day: '2-digit',
                                                month: 'short',
                                                year: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</TableCell>
                                            <TableCell className='team-table-row' align='center'>
                                                <Stack direction={'row'} spacing={2}>
                                                    <EditSquareIcon
                                                        sx={{ cursor: 'pointer' }}
                                                        onClick={() => {
                                                            setOPenUpdateUser(true);
                                                            setUserEdit(currUser)
                                                        }}
                                                    />
                                                    <DeleteIcon
                                                        sx={{ cursor: 'pointer' }}
                                                        onClick={
                                                            () => {
                                                                setOpenDelete(true);
                                                                setDeleteUser(currUser);
                                                            }
                                                        }
                                                    />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                        <UpdateUser
                            open={openUpdateUser}
                            handleClose={handleCloseUpdate}
                            setOPenUpdateUser={setOPenUpdateUser}
                            userEdit={userEdit}
                        />
                        <DeleteUser
                            open={openDelete}
                            handleClose={handleDeleteClose}
                            setOpenDelete={setOpenDelete}
                            deleteUser={deleteUser}
                        />
                        <TablePagination
                            className='table-pagination'
                            component="div"
                            count={filteredUsers.length}
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
    );
};
export default UserManagement;