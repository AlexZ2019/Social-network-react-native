import gql from 'graphql-tag';

export const DELETE_POST = gql`
    mutation DeletePost($id: Float!) {
        deletePost(id: $id)
    }
`;
