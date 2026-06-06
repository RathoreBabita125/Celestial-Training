import { Box} from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import CardComp from '../../common/Card';

const DashHome = () => {

    const { loginUserData} = useContext(AuthContext);
    

    return (
        <>
            <Box className='dash-home-page'>
                <Typography variant='h2' sx={{ fontWeight: 'bold', marginBottom:7}}>Welcome {loginUserData.fullName}</Typography>
                <Stack spacing={5}>
                    <Typography variant='h5'>Here are the details of your projects and tasks.</Typography>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Projects Details:</Typography>
                    <Stack direction={'row'} spacing={5}>
                        <CardComp name="Total Projects" count="20"/>                    
                        <CardComp name="Completed Projects" count="10"/>                    
                        <CardComp name="Ongoing Projects" count="5"/>                    
                        <CardComp name="Pending Projects" count="5"/>                    
                    </Stack>
                </Stack>
                <Box sx={{marginTop:10}}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom:5}}>Task Details:</Typography>
                    <Stack direction={'row'} spacing={5}>
                        <CardComp name="Total Projects" count="20"/>                    
                        <CardComp name="Completed Projects" count="10"/>                    
                        <CardComp name="Ongoing Projects" count="5"/>                    
                        <CardComp name="Pending Projects" count="5"/>                    
                    </Stack>
                </Box>
            </Box>
        </>
    )
}
export default DashHome;