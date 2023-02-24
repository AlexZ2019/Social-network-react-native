import gql from 'graphql-tag';

export const REFRESH_TOKEN_MUTATION = gql`
    mutation RefreshToken {
        refreshToken {
            accessToken
            refreshToken
        }
    }
`;
