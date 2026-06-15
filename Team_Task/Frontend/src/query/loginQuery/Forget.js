import { gql } from '@apollo/client'

export const FORGET = gql`
    mutation forget(
        $email:String!
        $password:String!
        $confirmPassword:String!
    ){
        forget(
            email:$email
            password:$password
            confirmPassword:$confirmPassword
        ){
            user{
                email
            }
        }
    }
`