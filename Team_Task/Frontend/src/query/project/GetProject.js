import { gql } from '@apollo/client';

export const GETPROJECTS = gql`
    query getProjects(
        $title:String
        $projectManager:String
        $status:String
        $priority:String
    ){
        projects(
            title:$title
            projectManager:$projectManager
            status:$status
            priority:$priority
        ){
            id
            title
            description
            projectManager
            projectManagerId
            engineers
            status
            updatedAt
            priority
            startDate
            endDate
        }
    }
`
