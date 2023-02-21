import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { API_HOST, API_PORT } from '@env';
import {
  getAsyncStorageValue, removeAsyncStorageValue,
  setAsyncStorageValue,
} from '../../utils/asyncStorage';
import { setContext } from '@apollo/client/link/context';

const isRefreshRequest = (operation: GraphQLRequest) => operation.operationName ===
  'refreshToken';

// Returns accesstoken if operation is not a refresh token request
const returnTokenDependingOnOperation = (operation: GraphQLRequest) => {
  if (isRefreshRequest(operation)) {
    return getAsyncStorageValue('refreshToken') || '';
  } else {
    return getAsyncStorageValue('accessToken') || '';
  }
};

const refreshToken = async () => {
  try {
    const refreshResolverResponse = await client.mutate<{
      refreshToken: string;
    }>({
      mutation: REFRESH_TOKEN,
    });
    
    const accessToken = refreshResolverResponse.data?.refreshToken.accessToken;
    await setAsyncStorageValue('accessToken',
      refreshResolverResponse.data?.refreshToken.accessToken);
    await setAsyncStorageValue('refreshToken',
      refreshResolverResponse.data?.refreshToken.refreshToken);
    return accessToken;
  } catch (err) {
    await removeAsyncStorageValue('accessToken');
    await removeAsyncStorageValue('refreshToken');
    throw err;
  }
};

const httpLink = createHttpLink({
  uri: `${API_HOST}${API_PORT}/graphql`,
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            // ignore 401 error for a refresh request
            if (operation.operationName === 'refreshToken') return;
            
            const observable = new Observable<FetchResult<Record<string, any>>>(
              (observer) => {
                // used an annonymous function for using an async function
                (async () => {
                  try {
                    const accessToken = await refreshToken();
                    
                    if (!accessToken) {
                      throw new GraphQLError('Empty AccessToken');
                    }
                    
                    forward(operation);
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              },
            );
            
            return observable;
        }
      }
    }
    
    if (networkError) console.log(`[Network error]: ${networkError}`);
  },
);
const authLink = setContext(async (operation, { headers }) => {
  const token = await returnTokenDependingOnOperation(operation);
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  uri: `${API_HOST}${API_PORT}/graphql`,
  cache: new InMemoryCache(),
});
