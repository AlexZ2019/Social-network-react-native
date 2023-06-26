import {
  Button,
  View,
  InputItem,
} from '@ant-design/react-native';
import React from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useMutation } from '@apollo/client';
import { EDIT_COMMENT } from '../../graphql/mutations/editComment';
import { GET_COMMENTS } from '../../graphql/queries/getComments';

const schema = yup.object().shape({
  text: yup.string(),
});

type Props = {
  text: string;
  id: number;
  postId: number,
  setIsEdit: (isEdit: boolean) => void
}
const EditComment = ({ text, id, postId, setIsEdit }: Props) => {
  const {
    control,
    handleSubmit,
  } = useForm<InputItem>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: { text },
  });
  
  const [editComment, { loading }] = useMutation(EDIT_COMMENT);
  
  const onSubmit = async (data) => {
    await editComment({
      variables: { text: data.text, id, postId },
      update(cache) {
        cache.modify({
          query: GET_COMMENTS,
          fields: {
            getComments(existingComments) {
              const editedComment = { ...data, id };
              return {
                ...existingComments,
                comments: { ...existingComments.comments, ...editedComment },
              };
            },
          },
        });
      },
      onCompleted: () => setIsEdit(false),
    });
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
          placeholder="Text">
        </InputItem>}
      />
      <Button type="primary" loading={loading}
              onPress={handleSubmit(onSubmit)}>
        Save Comment
      </Button>
    </View>
  );
};

export default EditComment;
