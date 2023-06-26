import {
  Button,
  View,
  InputItem,
} from '@ant-design/react-native';
import React from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_COMMENT,
} from '../../graphql/mutations/createComment';
import { GET_COMMENTS } from '../../graphql/queries/getComments';
import { CommentsProps } from '../../types';

const schema = yup.object().shape({
  text: yup.string().required(),
});
const CreateComment = ({ postId }: CommentsProps) => {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<InputItem>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });
  
  const [createComment, { loading }] = useMutation(CREATE_COMMENT);
  const { fetchMore } = useQuery(GET_COMMENTS);
  const onSubmit = async (data) => {
    await createComment({ variables: { ...data, postId } });
    await fetchMore({ variables: { postId } });
    reset();
  };
  return (
    <View>
      <Controller
        name="text"
        control={control}
        render={({ field }) => <InputItem
          {...field}
          clear
          error
          placeholder="Comment">
        </InputItem>}
      />
      <Button loading={loading} onPress={handleSubmit(onSubmit)}>
        Add Comment
      </Button>
    </View>
  );
};

export default CreateComment;
