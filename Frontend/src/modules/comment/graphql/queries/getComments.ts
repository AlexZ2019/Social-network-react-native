import gql from 'graphql-tag';

export const GET_COMMENTS = gql`
    query getComments($postId: Float!, $part: Float) {
        getComments(postId: $postId, part: $part) {
            total
            parts
            comments {
                text
                postId
                userId
                like
            }
        }
    }
`;
