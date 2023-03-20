import LoginForm from '../../components/LoginForm';
import { Text, View } from 'react-native';
import {
  getAsyncStorageValue,
  setTokensToAsyncStorage,
} from '../../../../utils/asyncStorage';
import { useLazyQuery, useMutation } from '@apollo/client';
import { USER_QUERY } from '../../../user/graphql/queries/user';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ILogin } from '../../types';
import { LOGIN_MUTATION } from '../../graphql/mutations/login';
import React from 'react';
import { Button } from '@ant-design/react-native';
import constants from '../../constants';

const LoginPage = () => {
  //TODO: add locales
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (data: { login: { accessToken: string; refreshToken: string } }) => {
      const tokens = data.login;
      await setTokensToAsyncStorage(tokens);
    },
  });
  
  const [fetchUser] = useLazyQuery(USER_QUERY);
  const onSubmit = async (data: ILogin): Promise<void> => {
    await login({ variables: data });
    const accessToken = await getAsyncStorageValue('accessToken');
    if (accessToken) {
      await fetchUser({ onCompleted: () => navigation.navigate('News') }); //TODO: need to save a user to apollo cache
    }
  };
  
  return (
    <View>
      <Text>Welcome!</Text>
      <LoginForm onSubmit={onSubmit}/>
      <Button onPress={() => navigation.navigate(constants.register)}>
        {constants.register}
      </Button>
    </View>
  );
};

export default LoginPage;
