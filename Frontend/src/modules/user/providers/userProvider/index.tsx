import { FC, ReactNode, useEffect } from 'react';
import { getAsyncStorageValue } from '../../../../utils/asyncStorage';
import { ActivityIndicator } from '@ant-design/react-native';
import { useLazyQuery } from '@apollo/client';
import { USER_QUERY } from '../../graphql/queries/user';

const UserProvider = (): FC<ReactNode> => {
  const accessToken = getAsyncStorageValue('accessToken');
  const [fetchUser, { loading }] = useLazyQuery(USER_QUERY, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });
  
  useEffect(() => {
    (async () => {
      if (accessToken) {
        await fetchUser();
      }
    })();
  }, [accessToken]);
  
  if (loading) {
    return <ActivityIndicator/>;
  }
  
  return <>{children}</>;
  
};

export default UserProvider;
