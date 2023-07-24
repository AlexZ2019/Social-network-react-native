import { ActivityIndicator, Icon } from '@ant-design/react-native';
import { useMutation } from '@apollo/client';
import {
  DELETE_COMMENT,
} from '../../graphql/mutations/deleteComment';

const DeleteComment = ({ id, postId }: { id: number, postId: number }) => {
  
  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT);
  
  const onPressHandler = async () => {
    await deleteComment({
      variables: { id, postId },
      update(cache) {
        const normalizedId = cache.identify({ id, __typename: 'CommentModel' });
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

export default DeleteComment;
