import React, { useEffect } from 'react';
import { CURRENT_USER_QUERY } from '../../../user/graphql/queries/currentUser';
import { useQuery } from '@apollo/client';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View } from 'react-native';

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
  
  return <>
    <View style={{ height: '94%' }}>
      {children}
    </View>
  </>;
};

export default PrivetRouteWrapper;
