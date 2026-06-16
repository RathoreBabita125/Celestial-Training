import { gql } from '@apollo/client';

export const UPDATEPROJECT = gql`
    mutation updateProject(
        $id: ID!
        $title: String
        $description: String
        $status: String
        $priority: String
        $projectManager: String
        $projectManagerId:String
        $engineers: [String]
        $startDate: Date
        $endDate: Date
    ){
        updateProject(
            id: $id
            title: $title
            description: $description
            status: $status
            priority: $priority
            projectManager: $projectManager
            projectManagerId:$projectManagerId
            engineers: $engineers
            startDate: $startDate
            endDate: $endDate
        ){
            id
            title
            description
            status
            priority
            projectManager
            engineers
            startDate
            endDate
        }
    }
`