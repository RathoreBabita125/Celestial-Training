import { gql } from '@apollo/client';

export const UPDATETASK = gql`
    mutation updateTask(
        $id:ID!
        $title:String!
        $description:String!
        $status:String!
        $priority:String!
        $assignedTo:ID!
        $projectId:ID!
        $dueDate:Date!
        $estimateDate:Date!
        ){
        updateTask(
            id:$id
            title:$title
            description:$description
            assignedTo:$assignedTo
            projectId:$projectId
            status:$status
            priority:$priority
            dueDate:$dueDate
            estimateDate:$estimateDate
        ){
            id
            title
            description
            status
            priority
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
