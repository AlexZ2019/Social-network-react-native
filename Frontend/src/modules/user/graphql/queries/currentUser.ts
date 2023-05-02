import { gql } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
    query getCurrentUser {
        getCurrentUser {
            id
            email
            nickname
            birthday
            biography
            status
        }
    }
`;
