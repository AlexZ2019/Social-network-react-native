import { useApolloClient } from '@apollo/client';
import { LOGOUT_MUTATION } from '../graphql/mutations/logout';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import constants from '../constants';
import { removeAsyncStorageValue } from '../../../utils/asyncStorage';

export const useLogout = () => {
  const apolloClient = useApolloClient();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  
  return async () => {
    await apolloClient.mutate({
      mutation: LOGOUT_MUTATION,
    });
    await apolloClient.clearStore();
    await removeAsyncStorageValue('accessToken');
    await removeAsyncStorageValue('refreshToken');
    navigation.navigate(constants.login);
  };
};
