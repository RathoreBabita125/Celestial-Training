import { gql } from '@apollo/client'

export const UPDATEUSER = gql`
    mutation updateUser(
        $id:ID!
        $fullName:String!
        $email:String!
        $password:String!
        $role:String!
        $phone:ID!
    ){
        updateUser(
            id:$id
            fullName:$fullName
            email:$email
            password:$password
            role:$role
            phone:$phone
        ){
            token
        }
    }
`