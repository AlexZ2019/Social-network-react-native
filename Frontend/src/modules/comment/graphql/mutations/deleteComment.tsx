import gql from 'graphql-tag';

export const DELETE_COMMENT = gql`
    mutation DeleteComment($id: Float!) {
        deleteComment(id: $id)
    }
`;
