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
import { Control, UseFormHandleSubmit } from 'react-hook-form/dist/types/form';

const RegistrationForm = ({ onSubmit, loading, handleSubmit, control }: {
  onSubmit: (data: IRegistration) => Promise<void>,
  loading: boolean,
  handleSubmit: UseFormHandleSubmit<TFieldValues>,
  control: Control<TFieldValues, TContext>
}) => {
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
            type="primary" loading={loading}>{constants.register}</Button>
  </View>;
};

export default RegistrationForm;
