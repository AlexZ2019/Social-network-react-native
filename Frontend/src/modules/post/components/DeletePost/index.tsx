import {
  ActivityIndicator,
  Icon, Modal,
} from '@ant-design/react-native';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../../graphql/mutations/deletePost';
import { View } from 'react-native';
import React from 'react';

const DeletePost = ({ id }: { id: number }) => {
  const [deletePost, { loading }] = useMutation(DELETE_POST);
  
  const onButtonClick = () => {
    Modal.alert('Delete Post?', '', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'OK', onPress: async () => await deletePost({
          variables: { id },
          update(cache) {
            const normalizedId = cache.identify(
              { id, __typename: 'PostModel' });
            cache.evict({ id: normalizedId });
            cache.gc();
          },
        }),
      },
    ]);
  };
  
  if (loading) {
    return <ActivityIndicator/>;
  }
  return (<View>
      <Icon onPress={onButtonClick} name="close-circle" size="md"
            color="red"/>
    </View>
  );
};

export default DeletePost;
