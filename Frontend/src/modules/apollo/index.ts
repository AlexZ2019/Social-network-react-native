import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { API_HOST, API_PORT } from '@env';
import { getAsyncStorageValue } from '../../utils/asyncStorage';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: `${API_HOST}${API_PORT}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  const accessToken = await getAsyncStorageValue('accessToken');
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    },
  };
});

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  uri: `${API_HOST}${API_PORT}/graphql`,
  cache: new InMemoryCache(),
});
