import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { GETTASKS } from '../../query/query';
import { useQuery } from '@apollo/client/react';
import { Box, Grid } from '@mui/material';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ViewTask = () => {

    const { loading, data } = useQuery(GETTASKS);    
    const {setAllTasks}=useContext(AuthContext);
    
    if (loading) {
        <Typography variant='body1'>loading...</Typography>
    }
    useEffect(()=>{
        if(data?.tasks){
            setAllTasks(data.tasks)
        }
    }, [data]);


    return (
        <>
            <Box className="view-task-section">        
                {data?.tasks?.length === 0 && <Typography variant='h5'>There is no project to view.</Typography>}
                <Grid container spacing={2} >
                    {
                        data?.tasks?.map((currTask) => {
                            return <Grid size={{xs: 12, sm: 6, md: 4}} key={currTask.id}>
                                <Card sx={{ height: 180 }}  >
                                    <CardContent>
                                        <Typography variant="h5">
                                            {currTask.id}. {currTask.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {currTask.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button >{currTask.status}</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        })
                    }
                </Grid>
            </Box>
        </>
    )
}
export default ViewTask;