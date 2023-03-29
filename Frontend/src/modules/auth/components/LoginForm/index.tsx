import { View } from 'react-native';
import { InputItem, Button } from '@ant-design/react-native';
import { Controller } from 'react-hook-form';
import { ILogin } from '../../types';
import { Control, UseFormHandleSubmit } from 'react-hook-form/dist/types/form';

const LoginForm = ({ onSubmit, loading, handleSubmit, control }: {
  onSubmit: (data: ILogin) => Promise<void>,
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
    <Button onPress={handleSubmit(onSubmit)} type="primary"
            loading={loading}>Login</Button>
  </View>;
};

export default LoginForm;
