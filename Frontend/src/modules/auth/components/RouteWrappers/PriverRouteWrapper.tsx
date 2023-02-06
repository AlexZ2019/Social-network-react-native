import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../../../user/graphql/queries/user';
import { useEffect } from 'react';

const PriverRouteWrapper = ({ navigation, Component }) => {
  const { data } = useQuery(USER_QUERY);
  useEffect(() => {
    if (!data) {
      navigation.navigate('Login');
    }
  }, [data]);
  
  return <Component {...props} />;
};
