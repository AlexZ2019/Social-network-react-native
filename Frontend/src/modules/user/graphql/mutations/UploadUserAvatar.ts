import gql from 'graphql-tag';

export const UPLOAD_USER_AVATAR_MUTATION = gql`
    mutation UploadUserAvatar($image: Upload!) {
        uploadUserAvatar(image: $image) {
            imageUrl
        }
    }
`;
