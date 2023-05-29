import {
  ApolloClient,
  createHttpLink,
  from, fromPromise,
  GraphQLRequest,
  InMemoryCache,
} from '@apollo/client';
import { API_HOST, API_PORT } from '@env';
import {
  getAsyncStorageValue,
  removeAsyncStorageValue,
  setAsyncStorageValue,
} from '../../utils/asyncStorage';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN_MUTATION } from '../auth/graphql/mutations/refreshToken';

const isRefreshRequest = (operation: GraphQLRequest) => operation.operationName ===
  'refreshToken';

const returnTokenDependingOnOperation = (operation: GraphQLRequest) => {
  if (isRefreshRequest(operation)) {
    return getAsyncStorageValue('refreshToken') || '';
  } else {
    return getAsyncStorageValue('accessToken') || '';
  }
};

const refreshToken = async () => {
  try {
    const refreshResolverResponse = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
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
            if (operation.operationName === 'RefreshToken') return;
            return fromPromise(
              refreshToken().catch((error) => {
                return;
              }),
            ).filter((value) => Boolean(value)).flatMap((accessToken) => {
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${accessToken}`,
                },
              });
              return forward(operation);
            });
        }
      }
    }
  
    if (networkError) {
      //TODO: handle this case
    }
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
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getUsers: {
            keyArgs: false,
            merge(existing, incoming) {
              if (existing) {
                return {
                  pages: existing.pages, total: existing.total,
                  users: [...existing.users, ...incoming.users],
                };
              } else {
                return incoming;
              }
            },
          },
        },
      },
    },
  }),
});
