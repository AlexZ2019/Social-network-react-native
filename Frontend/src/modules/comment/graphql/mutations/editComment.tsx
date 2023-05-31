import gql from 'graphql-tag';

export const EDIT_COMMENT = gql`
    mutation EditComment($id: Float!,$postId: Float!, $text: String!) {
        editComment(id: $id, postId: $postId, text: $text)
    }
`;
