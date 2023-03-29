import { Text, View } from 'react-native';
import { useMutation } from '@apollo/client';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IRegistration } from '../../types';
import React from 'react';
import { Button, InputItem } from '@ant-design/react-native';
import constants from '../../constants';
import RegistrationForm from '../../components/RegistrationForm';
import { REGISTER_MUTATION } from '../../graphql/mutations/register';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
  sex: yup.string<'male' | 'female'>().nullable(),
  firstname: yup.string().min(2),
  lastname: yup.string().min(2),
  birthday: yup.date(),
  nickname: yup.string().min(3),
  biography: yup.string().min(3),
});

const RegistrationPage = () => {
  //TODO: add locales
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<InputItem>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      sex: 'Male',
      birthday: new Date(),
    },
  });
  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: () => {
      navigation.navigate(constants.login);
      reset();
    },
  });
  const onSubmit = async (data: IRegistration): Promise<void> => {
    await register({ variables: data });
  };
  
  const navigateAndResetForm = () => {
    navigation.navigate(constants.login);
    reset();
  };
  
  return (
    <View>
      <Text>Please, fill in the form</Text>
      <RegistrationForm onSubmit={onSubmit} loading={loading}
                        handleSubmit={handleSubmit} control={control}/>
      <Button onPress={navigateAndResetForm}>
        {constants.login}
      </Button>
    </View>
  );
};

export default RegistrationPage;
