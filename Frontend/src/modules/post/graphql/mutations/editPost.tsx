import gql from 'graphql-tag';

export const EDIT_POST = gql`
    mutation EditPost($text: String!, $id: Float!) {
        editPost(text: $text, id: $id)
    }
`;
