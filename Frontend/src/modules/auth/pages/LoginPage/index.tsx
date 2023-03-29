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
import { Button, InputItem } from '@ant-design/react-native';
import constants from '../../constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
const LoginPage = () => {
  //TODO: add locales
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (data: { login: { accessToken: string; refreshToken: string } }) => {
      const tokens = data.login;
      await setTokensToAsyncStorage(tokens);
    },
  });
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<InputItem>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });
  
  const [fetchUser] = useLazyQuery(USER_QUERY);
  const onSubmit = async (data: ILogin): Promise<void> => {
    await login({ variables: data });
    const accessToken = await getAsyncStorageValue('accessToken');
    if (accessToken) {
      await fetchUser({ onCompleted: () => navigation.navigate('News') }); //TODO: need to save a user to apollo cache
    }
    reset();
  };
  
  const navigateAndResetForm = () => {
    navigation.navigate(constants.register);
    reset();
  };
  
  return (
    <View>
      <Text>Welcome!</Text>
      <LoginForm onSubmit={onSubmit} loading={loading} control={control}
                 handleSubmit={handleSubmit}/>
      <Button onPress={navigateAndResetForm}>
        {constants.register}
      </Button>
    </View>
  );
};

export default LoginPage;
