import { gql } from '@apollo/client';

export const GETME=gql`
    query getMe{
        getMe{
            id
            fullName
            role
            email
            phone
        }
    }
`