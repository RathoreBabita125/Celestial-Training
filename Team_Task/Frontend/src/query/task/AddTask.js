import { gql } from '@apollo/client';

export const CREATETASK = gql`
    mutation createTask(
        $title:String!
        $description:String!
        $assignedTo:ID!
        $projectId:ID!
        $status:String!
        $priority:String!
        $dueDate:Date!
        $estimateDate:Date!
    ){
        createTask(
            title:$title
            description:$description
            assignedTo:$assignedTo
            projectId:$projectId
            status:$status
            priority:$priority
            dueDate:$dueDate
            estimateDate:$estimateDate
        ){
            title
            description
            status
            priority
            dueDate
            estimateDate
            assignedTo{
                id
                fullName
            }
            project{
                id
                title
            }
        }
    }
`

