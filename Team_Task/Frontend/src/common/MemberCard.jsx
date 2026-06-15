import { Avatar, Box, Card, CardContent, Stack, Typography } from "@mui/material"

const MemberCard = ({ engineer, email, role, project, task, totalTask }) => {

    return (
        <Card sx={{width:300}}>
            <CardContent>
                <Stack direction={'column'} spacing={2}>
                    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Stack direction={'column'} spacing={2} sx={{justifyContent:'space-between'}}>
                            <Avatar sx={{ backgroundColor: '#053348', color: 'white', width:70, height:70}}>
                                <Typography variant="h5" color="initial">{engineer?.[0].toUpperCase()}</Typography>
                            </Avatar>
                            <Stack sx={{textAlign:'center'}}>
                                <Typography variant="body1">{engineer}</Typography>
                                <Typography variant="body2" sx={{color:'gray'}}>({role})</Typography>
                            </Stack>
                        </Stack>
                    </Box>
                    <Stack direction={'row'} spacing={2} sx={{justifyContent:'space-between', mt:5, p:1}}>
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', color:'#053348' }}><span>Project</span></Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', color:'#053348' }}><span>Task</span></Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', color:'#053348'  }}><span>Total Task</span></Typography>
                        </Box>
                        <Box sx={{textAlign:'center'}}> 
                            <Typography variant="body2">{project}</Typography>
                            <Typography variant="body2">{task}</Typography>
                            <Typography variant="body2">{totalTask}</Typography>
                        </Box>
                    </Stack>
                    <Typography sx={{p:1, color:'#053348'}}><strong>Email: </strong>{email}</Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}
export default MemberCard