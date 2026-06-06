import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingCompo = () => {
    return (
        <>
            <Box className='loader-compo' >
                <CircularProgress  />
            </Box>
        </>
    )
}
export default LoadingCompo;
