import { gql } from '@apollo/client';

export const DELETETASK = gql`
    mutation deleteTask(
        $id:ID!
    ){
        deleteTask(
            id:$id
        ){
            id
        }
    }
`