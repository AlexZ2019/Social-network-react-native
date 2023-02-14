import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_HOST, API_PORT } from '@env';

export const client = new ApolloClient({
  uri: `${API_HOST}${API_PORT}/graphql`,
  cache: new InMemoryCache(),
});
