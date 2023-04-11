import gql from 'graphql-tag';

export const GET_POSTS = gql`
    query GetPosts {
        getUserPosts {
            text
            id
            media
        }
    }
`;
