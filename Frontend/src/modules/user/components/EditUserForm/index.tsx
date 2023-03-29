import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import {
  List,
  DatePicker,
  InputItem,
  TextareaItem, Radio, Button,
} from '@ant-design/react-native';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { IUser } from '../../types';
import { IUserInfo } from '../../../auth/types';
import * as yup from 'yup';

const schema = yup.object().shape({
  sex: yup.string<'male' | 'female'>().nullable(),
  firstname: yup.string(),
  lastname: yup.string(),
  birthday: yup.date(),
  nickname: yup.string(),
  biography: yup.string(),
  status: yup.string(),
});
const EditUserForm = ({ user, onSubmit, loading }:
  { user: IUser, onSubmit: (data: IUserInfo) => Promise<void>, loading: boolean }) => {
  const {
    control,
    handleSubmit,
  } = useForm<InputItem>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      nickname: user.nickname || '',
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      sex: user.sex || 'Male',
      birthday: user.birthday || new Date(),
      status: user.status || '',
      biography: user.biography || '',
    },
  });
  
  return (
    <View>
      <Controller
        name="nickname"
        control={control}
        render={({ field }) => <InputItem
          {...field}
          clear
          placeholder="Nickname">
        </InputItem>}
      />
      <Controller
        name="firstname"
        control={control}
        render={({ field }) => <InputItem
          {...field}
          clear
          placeholder="Firstname">
        </InputItem>}
      />
      <Controller
        name="lastname"
        control={control}
        render={({ field }) => <InputItem
          {...field}
          clear
          placeholder="Lastname">
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
        name="birthday"
        control={control}
        render={({ field }) =>
          <DatePicker
            value={field.value}
            mode="date"
            locale="en"
            format="YYYY-MM-DD">
            <List.Item arrow="horizontal">Select Date</List.Item>
          </DatePicker>}
      />
      <Controller
        name="status"
        control={control}
        render={({ field }) => <InputItem
          {...field}
          clear
          placeholder="Status">
        </InputItem>}
      />
      <Controller
        name="biography"
        control={control}
        render={({ field }) => <TextareaItem
          {...field}
          clear
          placeholder="Biography">
        </TextareaItem>}
      />
      <Button onPress={handleSubmit(onSubmit)} loading={loading}
              type="primary">Save</Button>
    </View>
  );
};

export default EditUserForm;
