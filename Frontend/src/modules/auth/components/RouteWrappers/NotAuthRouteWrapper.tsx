import { ComponentType, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../../../user/graphql/queries/user';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { client } from '../../../apollo';

const NotAuthRouteWrapper = ({ children }: { children: JSX.Element }) => {
  //TODO: add props type
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const user = client.readQuery({
    query: USER_QUERY,
  });
  const { data } = useQuery(USER_QUERY);
  useEffect(() => {
    if (data || user) {
      navigation.navigate('News');
    }
  }, [data, user]);
  
  if (data || user) {
    return null;
  }
  
  return <>{children}</>;
};

export default NotAuthRouteWrapper;
