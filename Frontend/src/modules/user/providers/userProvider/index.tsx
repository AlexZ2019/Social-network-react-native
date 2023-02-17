import { useEffect } from 'react';
import { ActivityIndicator } from '@ant-design/react-native';
import { useLazyQuery } from '@apollo/client';
import { USER_QUERY } from '../../graphql/queries/user';
import * as React from 'react';
import { getAsyncStorageValue } from '../../../../utils/asyncStorage';

const UserProvider = ({ children }: { children: any }) => {
  const [fetchUser, { loading }] = useLazyQuery(USER_QUERY);
  useEffect(() => {
    (async () => {
      const accessToken = await getAsyncStorageValue('accessToken');
      if (accessToken) {
        await fetchUser();
      }
    })();
  }, []);
  
  if (loading) {
    return <ActivityIndicator/>;
  }
  
  return <>{children}</>;
  
};

export default UserProvider;
