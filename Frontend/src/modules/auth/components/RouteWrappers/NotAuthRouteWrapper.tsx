import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../../../user/graphql/queries/user';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const NotAuthRouteWrapper = ({ children }: { children: JSX.Element }) => {
  //TODO: add props type
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { data } = useQuery(USER_QUERY);
  useEffect(() => {
    if (data) {
      navigation.navigate('News');
    }
  }, [data]);
  
  if (data) {
    return null;
  }
  
  return <>{children}</>;
};

export default NotAuthRouteWrapper;
