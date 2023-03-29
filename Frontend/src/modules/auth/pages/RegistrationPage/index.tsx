import { Text, View } from 'react-native';
import { useMutation } from '@apollo/client';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IRegistration } from '../../types';
import React from 'react';
import { Button } from '@ant-design/react-native';
import constants from '../../constants';
import RegistrationForm from '../../components/RegistrationForm';
import { REGISTER_MUTATION } from '../../graphql/mutations/register';

const RegistrationPage = () => {
  //TODO: add locales
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: () => {
      navigation.navigate(constants.login);
    },
  });
  const onSubmit = async (data: IRegistration): Promise<void> => {
    await register({ variables: data });
  };
  
  return (
    <View>
      <Text>Please, fill in the form</Text>
      <RegistrationForm onSubmit={onSubmit} loading={loading}/>
      <Button onPress={() => navigation.navigate(constants.login)}>
        {constants.login}
      </Button>
    </View>
  );
};

export default RegistrationPage;
