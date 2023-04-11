import gql from 'graphql-tag';

export const GetPosts = gql`
    query GetPosts {
        getUserPosts {
            text
            id
            media
        }
    }
`;
