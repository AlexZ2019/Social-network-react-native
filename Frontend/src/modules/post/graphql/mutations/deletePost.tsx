import gql from 'graphql-tag';

export const DELETE_POSTS = gql`
    mutation DeletePost($id: Float!) {
        deletePost(id: $id)
    }
`;
