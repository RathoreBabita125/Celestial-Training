import { gql } from '@apollo/client'

export const GETUSERS = gql`
    query getUsers(
        $fullName:String
        $email:String
        $status:String
        $role:String
    ){
        users(
            fullName:$fullName
            email:$email
            status:$status
            role:$role
        ){
            id
            fullName
            email
            password
            role
            phone
            status
            createdAt
            updatedAt
            deletedAt
        }
    }
`