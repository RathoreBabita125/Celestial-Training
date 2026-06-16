import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';;
import { useQuery } from '@apollo/client/react';
import LoadingCompo from '../../common/Loader';
import { Box, Stack, Typography } from '@mui/material';
import CardComp from '../../common/Card';
import { GETUSERS } from '../../query/user/GetUser';
import { GETPROJECTS } from '../../query/project/GetProject';

const ManagerHome = () => {

    const { userAuth } = useContext(AuthContext);
    const { loading:projectLoading, data:projectData } = useQuery(GETPROJECTS);
    const {loading:userLoading, data:userData}=useQuery(GETUSERS);

    if (projectLoading || userLoading) {
        return <LoadingCompo />
    }

    const totalProject = projectData?.projects?.length;
    let completed = 0;
    let Ongoing = 0;
    let pending = 0;

    projectData?.projects?.forEach(currProject => {
        if(currProject.status==='Completed'){
            completed++
        }
        if(currProject.status==='In progress'){
            Ongoing++
        }
        if(currProject.status==='Pending'){
            pending++
        }
    });

    let activeMembers=0;

    userData?.users?.forEach(currUser => {
        if(currUser.status==='ACTIVE'){
            activeMembers++;
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
                    <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 5 }}>Tasks Details:</Typography>
                    <Stack direction={'row'} spacing={5}>
                        <CardComp name="Total Tasks" count={20} />
                        <CardComp name="Completed Tasks" count={10} />
                        <CardComp name="Ongoing Tasks" count={5}/>
                        <CardComp name="Pending Tasks" count={5} />
                    </Stack>
                </Box>
                <Box sx={{ marginTop: 10 }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 5 }}>Employee Details:</Typography>
                    <Stack direction={'row'} spacing={5}>
                        <CardComp name="Active Members" count={activeMembers} />
                        {/* <CardComp name="Admins" count={admin} />
                        <CardComp name="Project Managers" count={projectManager}/>
                        <CardComp name="Engineers" count={engineers} /> */}
                    </Stack>
                </Box>
            </Box>
        </>
    )
}
export default ManagerHome;