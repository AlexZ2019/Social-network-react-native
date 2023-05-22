import { gql } from '@apollo/client';

export const FRIENDS_QUERY = gql`
    query GetFriends($searchValue: String, $page: Float) {
        getFriends(searchValue: $searchValue, page: $page) {
            users {
                email
                id
                isFriend
                status
                birthday
                biography
            }
            total
            pages
        }
    }
`;
