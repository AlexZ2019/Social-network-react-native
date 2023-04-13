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
import { useMutation, useQuery } from '@apollo/client';
import { GET_POSTS } from '../../graphql/queries/getPosts';
import { EDIT_POST } from '../../graphql/mutations/editPost';

const schema = yup.object().shape({
  text: yup.string(),
});

type Props = {
  text: string;
  id: string;
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
  const { fetchMore } = useQuery(GET_POSTS);
  const onSubmit = async (data) => {
    await editPost({ variables: { text: data.text, id } });
    await fetchMore({});
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
