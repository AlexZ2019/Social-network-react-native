import useModal from '../../../common/hooks/useModal';
import {
  Button,
  Modal,
  View,
  TextareaItem, InputItem,
} from '@ant-design/react-native';
import React from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_POST } from '../../graphql/mutations/createPost';
import { GET_POSTS } from '../../graphql/queries/getPosts';

const schema = yup.object().shape({
  text: yup.string(),
});
const CreatePost = () => {
  const modal = useModal();
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<InputItem>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });
  
  const [createPost, { loading }] = useMutation(CREATE_POST);
  const { fetchMore } = useQuery(GET_POSTS);
  const onSubmit = async (data) => {
    await createPost({ variables: data });
    await fetchMore({});
    reset();
    modal.hideModal();
  };
  return (
    <View>
      <Button onPress={modal.showModal}>
        Create Post
      </Button>
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
          Post
        </Button>
      </Modal>
    </View>
  );
};

export default CreatePost;
