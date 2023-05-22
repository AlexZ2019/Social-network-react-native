import gql from 'graphql-tag';

export const GET_POSTS = gql`
    query GetPosts($userId: Float) {
        getUserPosts(userId: $userId) {
            text
            id
            media
        }
    }
`;
