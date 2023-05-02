import { useEffect } from 'react';
import { CURRENT_USER_QUERY } from '../../../user/graphql/queries/currentUser';
import { useQuery } from '@apollo/client';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const PrivetRouteWrapper = ({ children }: { children: JSX.Element }) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { data } = useQuery(CURRENT_USER_QUERY);
  useEffect(() => {
    if (!data) {
      navigation.navigate('Login');
    }
  }, [data]);
  
  if (!data) {
    return null;
  }
  
  return <>{children}</>;
};

export default PrivetRouteWrapper;
