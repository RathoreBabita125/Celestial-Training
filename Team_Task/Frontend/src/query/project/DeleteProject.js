import { gql } from '@apollo/client';

export const DELETEPROJECT = gql`
    mutation deleteProject(
        $id:ID!
    ){
        deleteProject(
            id:$id
        ){
            id
            title
            description
        }
    }
`