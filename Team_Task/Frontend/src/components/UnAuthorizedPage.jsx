import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography'
import './Component.css'
import NotFound from '../assets/bg-image.avif'
import MyButton from '../common/Button';
import {useNavigate} from 'react-router-dom';

const UnAuthorizedPage = () =>{
    const navigate=useNavigate();

    const handleSignBTN=()=>{
        navigate('/signin')
    }
    return (
        <>
        <Box className='unauthorized-page' sx={{backgroundImage:`url(${NotFound})`}}>
            <Stack spacing={2}>
                <Typography variant="h1" color="initial" sx={{fontWeight:'bold'}}>403</Typography>
                <Typography variant="h3" color="initial" sx={{fontWeight:'bold'}}>Access Denied</Typography>
                <Typography variant="h6" color="initial" >You don't have permission to access this page. </Typography>
                <Box sx={{alignItems:'center'}}>
                    <MyButton name="Go to Sign in" className='back-sign-button' handler={handleSignBTN}/>
                </Box>

            </Stack>
        </Box>
        </>
    )
}
export default UnAuthorizedPage;