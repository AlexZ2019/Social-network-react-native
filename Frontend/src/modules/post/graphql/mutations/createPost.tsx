import gql from 'graphql-tag';

export const CREATE_POSTS = gql`
    mutation CreatePost($text: String!) {
        createPost(text: $text)
    }
`;
