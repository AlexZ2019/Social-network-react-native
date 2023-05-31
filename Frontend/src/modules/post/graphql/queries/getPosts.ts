import gql from 'graphql-tag';

export const GET_POSTS = gql`
    query GetPosts($userId: Float, $page: Float) {
        getUserPosts(userId: $userId, page: $page) {
            total
            pages
            posts {
                id
                media
                text
            }
        }
    }
`;
