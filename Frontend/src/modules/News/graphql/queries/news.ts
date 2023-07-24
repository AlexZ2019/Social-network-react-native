import gql from 'graphql-tag';

export const GET_NEWS_QUERY = gql`
    query GetNews {
        getNews {
            total
            pages
            posts {
                id
                media
                text
                name
                nickname
                email
                like
            }
        }
    }
`;
