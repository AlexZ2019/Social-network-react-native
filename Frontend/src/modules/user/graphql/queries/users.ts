import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
    query GetUsers($searchValue: String, $page: Float) {
        getUsers(searchValue: $searchValue, page: $page) {
            total
            pages
            users {
                email
                birthday
                id
                nickname
                status
                isFriend
            }
        }
    }
`;
