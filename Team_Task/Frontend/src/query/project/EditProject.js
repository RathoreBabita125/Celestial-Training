import { gql } from '@apollo/client';

export const UPDATEPROJECT = gql`
    mutation updateProject(
        $id:ID!
        $title:String!
        $description:String!
        $status:String!
        $priority:String!
    ){
        updateProject(
            id:$id
            title:$title
            description:$description
            status:$status
            priority:$priority
        ){
            id
            title
            description
            status
            priority
        }
    }
`
