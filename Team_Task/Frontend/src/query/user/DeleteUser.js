import { gql } from '@apollo/client'

export const DELETEUSER = gql`
    mutation deleteUser(
        $id:ID!
    ){
        deleteUser(
            id:$id
        ){
            token
        }
    }
`