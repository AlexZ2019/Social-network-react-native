import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../../../user/graphql/queries/user';
import { useEffect } from 'react';

const NotAuthRouteWrapper = ({ navigation, Component }) => {
  const { data } = useQuery(USER_QUERY);
  useEffect(() => {
    if (data) {
      navigation.navigate('News');
    }
  }, [data]);
  
  return <Component {...props} />;
};
