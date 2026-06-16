import { gql } from '@apollo/client';

export const GETTASKS = gql`
    query getTasks{
        tasks{
            id
            title
            description
            status
            priority
            dueDate
            estimateDate
            updatedAt
            assignedTo{
                id
                fullName
            }
            project{
                id
                title
                projectManager
            }
        }
    }
`