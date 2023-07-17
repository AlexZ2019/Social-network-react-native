import useModal from '../../../common/hooks/useModal';
import {
  Button,
  Modal,
  View,
  TextareaItem, InputItem, Icon,
} from '@ant-design/react-native';
import React from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useMutation } from '@apollo/client';
import { EDIT_POST } from '../../graphql/mutations/editPost';
import { GET_POSTS } from '../../graphql/queries/getPosts';

const schema = yup.object().shape({
  text: yup.string(),
});

type Props = {
  text: string;
  id: number;
}
const EditPost = ({ text, id }: Props) => {
  const modal = useModal();
  const {
    control,
    handleSubmit,
  } = useForm<InputItem>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: { text },
  });
  
  const [editPost, { loading }] = useMutation(EDIT_POST);
  const onSubmit = async (data) => {
    await editPost({
      variables: { text: data.text, id },
      update(cache) {
        cache.modify({
          query: GET_POSTS,
          fields: {
            getUserPosts(existingPosts) {
              const editedPost = { ...data, id };
              return {
                ...existingPosts,
                posts: { ...existingPosts.posts, ...editedPost },
              };
            },
          },
        });
      },
    });
    modal.hideModal();
  };
  return (
    <View>
      <Icon name="edit" onPress={modal.showModal}/>
      <Modal
        transparent={false}
        visible={modal.isVisible}
        animationType="slide-up"
        onClose={modal.hideModal}>
        <View style={{ paddingVertical: 220 }}>
          <Controller
            name="text"
            control={control}
            render={({ field }) => <TextareaItem
              {...field}
              clear
              placeholder="Post Text">
            </TextareaItem>}
          />
        </View>
        <Button type="primary" loading={loading}
                onPress={handleSubmit(onSubmit)}>
          Save Post
        </Button>
      </Modal>
    </View>
  );
};

export default EditPost;
