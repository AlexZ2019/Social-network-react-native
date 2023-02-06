import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: `${process.env.API_HOST}${process.env.API_PORT}`,
  cache: new InMemoryCache(),
});
