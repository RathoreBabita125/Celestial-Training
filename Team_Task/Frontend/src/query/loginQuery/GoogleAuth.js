import { gql } from '@apollo/client'

export const GOOGLE_AUTH_MUTATION = gql`
    mutation AuthWithGoogle(
        $idToken:String
    ){
        authWithGoogle(
            idToken:$idToken
        ){
            token
            user{
                id
                email
                name
            }
        }
    }
`