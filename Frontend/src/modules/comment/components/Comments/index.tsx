import { NetworkStatus, useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../../graphql/queries/getComments';
import { FlatList } from 'react-native';
import Comment from '../Comment';
import { ActivityIndicator } from '@ant-design/react-native';
import * as React from 'react';
import { useState } from 'react';
import CreateComment from '../AddComment';
import { CommentsProps } from '../../types';
import { CURRENT_USER_QUERY } from '../../../user/graphql/queries/currentUser';

const Comments = ({ postId }: CommentsProps) => {
  const [part, setPart] = useState<number>(1);
  const { data, loading, fetchMore, networkStatus } = useQuery(GET_COMMENTS, {
    variables: {
      postId,
    },
  });
  const { data: currentUser } = useQuery(CURRENT_USER_QUERY);
  const userId = currentUser.getCurrentUser.id;
  const getMoreComments = async () => {
    if (part < data?.getComments.parts) {
      setPart(prevState => prevState + 1);
      await fetchMore({ variables: { part: part + 1, postId } });
    }
  };
  
  return (
    <>
      <CreateComment postId={postId}/>
      <FlatList
        data={data?.getComments.comments}
        onEndReached={getMoreComments}
        onEndReachedThreshold={0.25}
        renderItem={({ item }) => {
          return <Comment text={item.text} media={item.media} postId={postId}
                          key={item.id} id={item.id} name={item.name}
                          nickname={item.nickname} userId={item.userId}
                          isEditable={userId === item.userId}
                          like={item.like} email={item.email}
          />;
        }}
      />
      <ActivityIndicator animating={networkStatus === NetworkStatus.fetchMore
        || loading}/>
    </>
  );
};

export default Comments;
