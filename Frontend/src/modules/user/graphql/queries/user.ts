import { gql } from '@apollo/client';

export const USER_QUERY = gql`
    query getCurrentUser {
        getCurrentUser {
            id
            email
            nickname
        }
    }
`;
