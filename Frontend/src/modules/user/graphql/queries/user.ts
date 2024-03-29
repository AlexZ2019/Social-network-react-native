import { gql } from '@apollo/client';

export const USER_QUERY = gql`
    query getUser($id: Float!) {
        getUser(id: $id) {
            id
            email
            status
            biography
            nickname
            birthday
            sex
        }
    }
`;
