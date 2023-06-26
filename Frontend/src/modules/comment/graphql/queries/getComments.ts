import gql from 'graphql-tag';

export const GET_COMMENTS = gql`
    query getComments($postId: Float!, $part: Float, $size: Float) {
        getComments(postId: $postId, part: $part, size: $size) {
            total
            parts
            comments {
                id
                text
                postId
                userId
                like
            }
        }
    }
`;
