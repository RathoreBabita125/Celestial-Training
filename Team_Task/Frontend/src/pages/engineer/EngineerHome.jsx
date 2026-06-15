import { Box, Stack, Typography } from "@mui/material";
import CardComp from "../../common/Card";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@apollo/client/react";
import LoadingCompo from "../../common/Loader";
import { GETTASKS } from "../../query/task/GetTask";

const EngineerHome=()=>{
    const {userAuth} = useContext(AuthContext);
    const {loading:taskLoading, data:taskData} = useQuery(GETTASKS);

    if(taskLoading) return <LoadingCompo/>
    console.log(taskData);
    console.log(userAuth);

    const totalTask=taskData?.tasks?.filter((currTask)=>currTask?.assignedTo?.id===userAuth.id).length; 
    const completed=taskData?.tasks?.filter((currTask)=>((currTask?.assignedTo?.id===userAuth.id) && currTask.status==='Completed')).length;
    const pending=taskData?.tasks?.filter((currTask)=>((currTask?.assignedTo?.id===userAuth.id) && currTask.status==='Pending')).length;
    const Ongoing=taskData?.tasks?.filter((currTask)=>((currTask?.assignedTo?.id===userAuth.id) && currTask.status==='In progress')).length;

    return(
        <>
          <Box className='dash-home-page' >
                <Typography variant='h2' sx={{ fontWeight: 'bold', marginBottom: 7 }}>Welcome {userAuth.fullName}</Typography>
                <Stack spacing={5}>
                    <Typography variant='h5'>Here are the details of yours tasks.</Typography>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Task Details</Typography>
                    <Stack direction={'row'} spacing={5}>
                        <CardComp name="Total Tasks" count={totalTask} />
                        <CardComp name="Completed Tasks" count={completed} />
                        <CardComp name="Pending Tasks" count={pending} />
                        <CardComp name="In Process Tasks" count={Ongoing} />
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}
export default EngineerHome;