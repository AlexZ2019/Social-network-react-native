import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  DatePicker,
  Flex,
  Icon,
  InputItem,
  List,
  Radio,
  TextareaItem,
} from '@ant-design/react-native';
import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { IUserInfo } from '../../../auth/types';
import * as yup from 'yup';
import { CURRENT_USER_QUERY } from '../../graphql/queries/currentUser';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_USER_MUTATION } from '../../graphql/mutations/editUser';
import { Text } from 'react-native';

const schema = yup.object().shape({
  sex: yup.string<'male' | 'female'>().nullable(),
  firstname: yup.string(),
  lastname: yup.string(),
  birthday: yup.date(),
  nickname: yup.string(),
  biography: yup.string(),
  status: yup.string(),
});
const EditUserForm = () => {
  const [isProfileEdit, setIsProfileEdit] = useState<boolean>(false);
  const { data: currentUser } = useQuery(CURRENT_USER_QUERY);
  const [editUser, { loading }] = useMutation(EDIT_USER_MUTATION);
  const onSubmit = async (data: IUserInfo): Promise<void> => {
    await editUser({
      variables: data,
      update(cache) {
        const user = cache.readQuery({ query: CURRENT_USER_QUERY });
        const updatedUser = {
          getCurrentUser: {
            ...user.getCurrentUser,
            ...data,
            birthday: data.birthday.toISOString().split('T')[0],
          },
        };
        cache.writeQuery({ query: CURRENT_USER_QUERY, data: updatedUser });
      },
      onCompleted: () => {
        setIsEditProfile(false);
      },
    });
  };
  
  const {
    control,
    handleSubmit,
  } = useForm<InputItem>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      nickname: currentUser?.getCurrentUser.nickname || '',
      firstname: currentUser?.getCurrentUser.firstname || '',
      lastname: currentUser?.getCurrentUser.lastname || '',
      sex: currentUser?.getCurrentUser.sex || 'Male',
      birthday: new Date(currentUser?.getCurrentUser.birthday) || new Date(),
      status: currentUser?.getCurrentUser.status || '',
      biography: currentUser?.getCurrentUser.biography || '',
    },
  });
  
  const onProfileEdit = () => {
    setIsProfileEdit(!isProfileEdit);
  };
  
  return (
    <>
      <Flex onPress={onProfileEdit}>
        <Icon name="user"/>
        <Text style={{ marginLeft: 5 }}>Edit Profile</Text>
      </Flex>
      {isProfileEdit &&
        <>
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
            render={({ field }) => {
              return <DatePicker
                {...field}
                minDate={new Date(1940, 7, 6)}
                maxDate={new Date()}
                mode="date"
                locale="en"
                format="YYYY-MM-DD">
                <List.Item arrow="horizontal">Select Date</List.Item>
              </DatePicker>;
            }
            }
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
        </>
      }
    </>
  );
};

export default EditUserForm;
