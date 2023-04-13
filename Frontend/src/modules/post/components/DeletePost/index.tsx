import { ActivityIndicator, Button, Icon } from '@ant-design/react-native';
import { useMutation } from '@apollo/client';
import { DELETE_POSTS } from '../../graphql/mutations/deletePost';

const DeletePost = ({ id }: { id: number }) => {
  
  const [deletePost, { loading }] = useMutation(DELETE_POSTS);
  
  const onPressHandler = async () => {
    await deletePost({
      variables: { id },
      update(cache) {
        const normalizedId = cache.identify({ id, __typename: 'PostModel' });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
  };
  
  if (loading) {
    return <ActivityIndicator/>;
  }
  return <Icon onPress={onPressHandler} name="close-circle" size="md"
               color="red"/>;
};

export default DeletePost;
