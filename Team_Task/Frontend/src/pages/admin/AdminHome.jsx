import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { GETPROJECTS, GETUSERS } from '../../query/query';
import { useQuery } from '@apollo/client/react';
import LoadingCompo from '../../common/Loader';
import CardComp from '../../common/Card'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const AdminHome = () => {

    const { userAuth } = useContext(AuthContext);
    const { loading: projectLoading, data: projectData } = useQuery(GETPROJECTS);
    const { loading: userLoading, data: userData } = useQuery(GETUSERS);

    if (projectLoading || userLoading) {
        return <LoadingCompo />
    }

    const totalProject = projectData.projects.length;
    let completed = 0;
    let Ongoing = 0;
    let pending = 0;

    projectData?.projects?.forEach(currProject => {
        if (currProject.status === 'Completed') {
            completed++
        }
        if (currProject.status === 'In progress') {
            Ongoing++
        }
        if (currProject.status === 'Pending') {
            pending++
        }
    });

    const totalEmployee = userData.users.length;
    let admin = 0;
    let projectManager = 0;
    let engineers = 0;

    userData?.users?.forEach(currUser => {
        if (currUser.role === 'Admin') {
            admin++;
        }
        if (currUser.role === 'Project Manager') {
            projectManager++;
        }
        if (currUser.role === 'Engineer') {
            engineers++;
        }
    });

    return (
        <>
            <Box className='dash-home-page'>
                <Typography variant='h2' sx={{ fontWeight: 'bold', marginBottom: 7 }}>Welcome {userAuth.fullName}</Typography>
                <Stack spacing={5}>
                    <Typography variant='h5'>Here are the details of your projects and tasks.</Typography>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Projects Details:</Typography>
                    <Stack direction={'row'} spacing={5}>
                        <CardComp name="Total Projects" count={totalProject} />
                        <CardComp name="Completed Projects" count={completed} />
                        <CardComp name="Ongoing Projects" count={Ongoing} />
                        <CardComp name="Pending Projects" count={pending} />
                    </Stack>
                </Stack>
                <Box sx={{ marginTop: 10 }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 5 }}>Employee Details:</Typography>
                    <Stack direction={'row'} spacing={5}>
                        <CardComp name="Total Employees" count={totalEmployee} />
                        <CardComp name="Admins" count={admin} />
                        <CardComp name="Project Managers" count={projectManager}/>
                        <CardComp name="Engineers" count={engineers} />
                    </Stack>
                </Box>
            </Box>
        </>
    )
}
export default AdminHome;