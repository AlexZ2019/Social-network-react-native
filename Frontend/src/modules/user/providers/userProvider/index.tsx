import { useEffect, useState } from 'react';
import { getAsyncStorageValue } from '../../../../utils/asyncStorage';
import { ActivityIndicator } from '@ant-design/react-native';
import { useLazyQuery } from '@apollo/client';
import { USER_QUERY } from '../../graphql/queries/user';
import * as React from 'react';

const UserProvider = ({ children }: { children: any }) => {
  const [accessToken, setAccessToken] = useState<null | string>(null);
  useEffect(() => {
    (async () => {
      const accessToken = await getAsyncStorageValue('accessToken');
      setAccessToken(accessToken);
    })();
  }, []);
  
  const [fetchUser, { loading }] = useLazyQuery(USER_QUERY, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`, // TODO: remove headers from this place
      },
    },
  });
  useEffect(() => {
    if (accessToken) {
      fetchUser();
    }
  }, [accessToken]);
  
  if (loading) {
    return <ActivityIndicator/>;
  }
  
  return <>{children}</>;
  
};

export default UserProvider;
