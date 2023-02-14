import { ComponentType, FC, useEffect } from 'react';
import { USER_QUERY } from '../../../user/graphql/queries/user';
import { useQuery } from '@apollo/client';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const PrivetRouteWrapper = ({ children }: { children: ComponentType }) => {
  //TODO: add types for props
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { data } = useQuery(USER_QUERY);
  useEffect(() => {
    if (!data) {
      navigation.navigate('Login');
    }
  }, [data]);
  
  return <>{children}</>;
};

export default PrivetRouteWrapper;
