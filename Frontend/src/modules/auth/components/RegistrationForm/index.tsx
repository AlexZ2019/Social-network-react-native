import constants from '../../constants';
import {
  Button,
  DatePicker,
  InputItem,
  TextareaItem,
  List, Radio,
} from '@ant-design/react-native';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IRegistration } from '../../types';
import React from 'react';

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

const RegistrationForm = ({ onSubmit }: {
  onSubmit: (data: IRegistration) => Promise<void>
}) => {
  const {
    control,
    handleSubmit,
  } = useForm<InputItem>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      sex: 'Male',
      birthday: new Date(),
    },
  });
  
  return <View>
    <Controller
      name="email"
      control={control}
      render={({ field }) => <InputItem
        {...field}
        clear
        error
        placeholder="Email">
      </InputItem>}
    />
    <Controller
      name="password"
      control={control}
      render={({ field }) => <InputItem
        {...field}
        type="password"
        clear
        error
        placeholder="password">
      </InputItem>}
    />
    <Controller
      name="sex"
      control={control}
      render={({ field }) =>
        <Radio.Group defaultValue="1" {...field}>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>}
    />
    <Controller
      name="firstname"
      control={control}
      render={({ field }) => <InputItem
        {...field}
        clear
        error
        placeholder="firstname">
      </InputItem>}
    />
    <Controller
      name="lastname"
      control={control}
      render={({ field }) => <InputItem
        {...field}
        clear
        error
        placeholder="lastname">
      </InputItem>}
    />
    <Controller
      name="birthday"
      control={control}
      render={({ field }) => <DatePicker
        {...field}
        locale="en"
        mode="date"
        // defaultDate={new Date()}
        minDate={new Date(1940, 7, 6)}
        maxDate={new Date()}
        format="YYYY-MM-DD">
        <List.Item arrow="horizontal">Select Date</List.Item>
      </DatePicker>}
    />
    <Controller
      name="nickname"
      control={control}
      render={({ field }) => <InputItem
        {...field}
        clear
        error
        placeholder="nickname">
      </InputItem>}
    />
    <Controller
      name="biography"
      control={control}
      render={({ field }) => <TextareaItem
        {...field}
        rows={4}
        placeholder="biography"
        autoHeight
        style={{ paddingVertical: 5 }}
      />}
    />
    <Button onPress={handleSubmit(onSubmit)}
            type="primary">{constants.register}</Button>
  </View>;
};

export default RegistrationForm;
