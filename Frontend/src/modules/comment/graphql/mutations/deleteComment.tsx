import gql from 'graphql-tag';

export const DELETE_COMMENT = gql`
    mutation DeleteComment($id: Float!, $postId: Float!) {
        deleteComment(id: $id, postId: $postId)
    }
`;
