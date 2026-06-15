import { gql } from '@apollo/client';

export const CREATEPROJECT = gql`
    mutation createProject(
        $title:String!
        $description:String!
        $projectManager:String!
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
            engineers
            status
            priority
            startDate
            endDate
        }
    }
`
