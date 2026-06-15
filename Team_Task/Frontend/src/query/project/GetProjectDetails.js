import { gql } from '@apollo/client';

export const GETPROJECTDETAILS = gql`
    query getProjectDetails{
        getProjectDetails{
            id
            title
            projectManager
            endDate
            status
            priority
            tasks{
                title
                status
                assignedTo{
                    fullName
                    role
                    email
                }
            }
        }  
    }
`