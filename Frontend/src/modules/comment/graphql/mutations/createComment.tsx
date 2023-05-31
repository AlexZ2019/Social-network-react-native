import gql from 'graphql-tag';

export const CREATE_COMMENT = gql`
    mutation CreateComment($postId: Float!, $text: String!) {
        createComment(postId: $postId, text: $text)
    }
`;
