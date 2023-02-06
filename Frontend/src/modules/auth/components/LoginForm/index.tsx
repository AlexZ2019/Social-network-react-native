import { Alert, View } from 'react-native';
import { InputItem, Button } from '@ant-design/react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Index = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<InputItem>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });
  
  const onSubmit = () => {
  
  };
  
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
    <Button onPress={onSubmit} type="primary">Login</Button>
  </View>;
};

export default Index;
