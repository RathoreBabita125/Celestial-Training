import { gql } from '@apollo/client'

export const ADDUSER = gql`
    mutation addUser( $fullName : String!,
        $email : String!,
        $password : String!,
        $role : String!,
        $phone : ID!
        ){
        addUser(
            fullName : $fullName,
            email : $email,
            password : $password,
            role : $role,
            phone : $phone
        ){
            token
        }  
    } 
`