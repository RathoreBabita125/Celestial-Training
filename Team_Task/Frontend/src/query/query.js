import { gql } from '@apollo/client'

export const SIGNUP = gql`
    mutation signup(
        $fullName : String!,
        $email : String!,
        $password : String!,
        $confirmPassword : String!,
        $role : String!,
        $phone : ID!
        ){
            signup(
                fullName : $fullName,
                email : $email,
                password : $password,
                confirmPassword : $confirmPassword,
                role : $role,
                phone : $phone
        ){
            token   
        }  
    } 
`;

export const LOGIN=gql`
    mutation login(
        $email:String!
        $password:String!
    ){
        login(
            email:$email
            password:$password
        ){
            token
        }
    }
`;