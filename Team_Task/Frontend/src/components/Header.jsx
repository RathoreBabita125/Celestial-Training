import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './Component.css'
import { Link } from 'react-router'
const Header=()=>{
    return(
        <>
        <AppBar position='fixed' className='header-appbar'>
          <Toolbar className='navbar-toolbar'>
            <Typography variant='h5' >Team Task</Typography>
            <Box className='navbar-button-box'>
                <Link to='/signin'><Button className='navbar-button' variant='text'>Sign in</Button></Link>
                <Link to='signup'><Button className='navbar-button' variant='text'>Sign up Free <ArrowForwardIcon/></Button></Link>
            </Box>
          </Toolbar>
        </AppBar>
        </>
    )
}
export default Header;