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
import { GETUSERS } from '../../query/query';
import LoadingCompo from '../../common/Loader';


const Team = () => {

    const { loading, data } = useQuery(GETUSERS);
    if(loading){
        return <LoadingCompo/>
    }
    return (
        <>
            <Box className="dash-team-section">
                <Typography variant="h3" color="initial" sx={{ fontWeight: 'bold' }}>All Team members are here</Typography>
                <Stack>
                    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: '50px auto' }}>
                        <Table aria-label="user data">
                            <TableHead>
                                <TableRow>
                                    <TableCell className='team-table-column'>ID</TableCell>
                                    <TableCell className='team-table-column'>Name</TableCell>
                                    <TableCell className='team-table-column'>Email</TableCell>
                                    <TableCell className='team-table-column'>Phone</TableCell>
                                    <TableCell className='team-table-column'>Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data.users.map((currUser) => {
                                        return (<TableRow>
                                            <TableCell className='team-table-row'>{currUser.id}</TableCell>
                                            <TableCell className='team-table-row'>{currUser.fullName}</TableCell>
                                            <TableCell className='team-table-row'>{currUser.email}</TableCell>
                                            <TableCell className='team-table-row'>{currUser.phone}</TableCell>
                                            <TableCell className='team-table-row'>{currUser.role}</TableCell>
                                        </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Box>
        </>
    );
}
export default Team;