import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { AppBar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './Component.css'

const Home = () => {
    return (
        <>
            <Box>
                <AppBar position='fixed' className='header-appbar'>
                    <Toolbar className='navbar-toolbar'>
                        <Typography variant='h5' >Team Task</Typography>
                        <Box className='navbar-button-box'>
                            <Link to='/signin'><Button className='navbar-button' variant='text'>Sign in</Button></Link>
                            <Link to='/signup'><Button className='navbar-button' variant='text'>Sign up Free <ArrowForwardIcon /></Button></Link>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Stack direction={'row'} spacing={2} className='home-container'>
                    <Box className='home-left'>
                        <Typography variant="h3" color="initial" className='home-left-heading'>Streamlined Task Management for Teams and Individuals</Typography>
                        <Typography variant="body1" color="initial" className='home-left-body'>In today's fast-paced world, staying organized and on track can be challenging,
                            whether you are working alone or part of a team.</Typography>
                    </Box>
                    <Box className='home-right'>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}
export default Home;