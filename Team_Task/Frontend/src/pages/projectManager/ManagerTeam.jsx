import { Box, Stack, Typography } from "@mui/material"
import MemberCard from "../../common/MemberCard"
import LoadingCompo from "../../common/Loader";
import { useQuery } from "@apollo/client/react";
import { GETPROJECTDETAILS } from "../../query/project/GetProjectDetails";


const ManagerTeam = () => {
    const { loading: projectDetailsLoading, data: projectDetails } = useQuery(GETPROJECTDETAILS);
    if (projectDetailsLoading) return <LoadingCompo />

    // const members = projectDetails?.getProjectDetails?.map((project) => project.tasks)
    //     .reduce((acc, task) => {
    //         const userId = task.assignedTo.id;
    //         if (!acc.find(user => user.id === userId)) {
    //             acc.push({
    //                 id: userId,
    //                 engineer: task.assignedTo.fullName,
    //                 email: task.assignedTo?.email,
    //                 role: task.assignedTo.role,
    //                 tasks: [task.title],
    //                 project: task.project.title
    //             })
    //         }
    //     }
    //     )

    return (
        <>
            <Box className="project-section">
                <Box className="project-box">
                    <Typography variant="h4" color="initial" sx={{ fontWeight: 'bold', mb: 5 }}>Team Member Details</Typography>
                    <Stack direction={'row'} spacing={1} sx={{display:"flex", flexWrap:'wrap', gap:5}}>
                        {
                            projectDetails?.getProjectDetails?.map((projectData) => {
                                return projectData?.tasks?.map((taskData) => {
                                    return <MemberCard
                                        key={taskData.id}
                                        engineer={taskData.assignedTo?.fullName}
                                        email={taskData.assignedTo?.email}
                                        role={taskData.assignedTo?.role}
                                        project={projectData?.title}
                                        task={taskData?.title}
                                        totalTask={projectData.tasks.length}
                                    />
                                })
                            })
                        }
                    </Stack>
                </Box>
            </Box>
        </>
    )
}
export default ManagerTeam;



