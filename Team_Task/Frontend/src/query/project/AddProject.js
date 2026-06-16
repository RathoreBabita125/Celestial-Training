import { gql } from '@apollo/client';

export const CREATEPROJECT = gql`
    mutation createProject(
        $title:String!
        $description:String!
        $projectManager:String!
        $projectManagerId:String
        $engineers:[String!]
        $status:String!
        $priority:String!
        $startDate:Date!
        $endDate:Date!
    ){
        createProject(
            title:$title
            description:$description
            projectManager:$projectManager
            projectManagerId:$projectManagerId
            engineers:$engineers
            status:$status
            priority:$priority
            startDate:$startDate
            endDate:$endDate
        ){
            id
            title
            description
            projectManager
            projectManagerId
            engineers
            status
            priority
            startDate
            endDate
        }
    }
`
