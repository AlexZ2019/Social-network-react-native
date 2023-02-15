import LoginForm from '../../components/LoginForm';
import { Text, View } from 'react-native';
import {
  getAsyncStorageValue,
  setTokensToAsyncStorage,
} from '../../../../utils/asyncStorage';
import { useLazyQuery, useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../../graphql/mutations/login';
import { USER_QUERY } from '../../../user/graphql/queries/user';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ILogin } from '../../types';

const LoginPage = () => {
  //TODO: add locales
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data: { login: { accessToken: string; refreshToken: string } }) => {
      const tokens = data.login;
      setTokensToAsyncStorage(tokens);
    },
  });
  
  const [fetchUser] = useLazyQuery(USER_QUERY);
  const onSubmit = async (data: ILogin): Promise<void> => {
    await login({ variables: data });
    const accessToken = await getAsyncStorageValue('accessToken');
    if (accessToken) {
      await fetchUser(); //TODO: need to save a user to apollo cache
      navigation.navigate('News');
    }
  };
  
  return (
    <View>
      <Text>Welcome!</Text>
      <Text>Please, sign in</Text>
      <LoginForm onSubmit={onSubmit}/>
    </View>
  );
};

export default LoginPage;
