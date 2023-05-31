import { NetworkStatus, useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../../graphql/queries/getComments';
import { FlatList } from 'react-native';
import Comment from '../Comment';
import { ActivityIndicator } from '@ant-design/react-native';
import * as React from 'react';
import { useState } from 'react';

type Props = {
  postId: number | undefined
}

const Comments = ({ postId }: Props) => {
  const [part, setPart] = useState<number>(1);
  const { data, loading, fetchMore, networkStatus } = useQuery(GET_COMMENTS, {
    variables: {
      postId,
    },
  });
  
  const getMoreComments = async () => {
    if (part < data?.getUserPosts.parts) {
      setPart(prevState => prevState + 1);
      await fetchMore({ variables: { part: part + 1, postId } });
    }
  };
  
  return (
    <>
      <FlatList
        data={data?.getComments.comments}
        onEndReached={getMoreComments}
        onEndReachedThreshold={0.25}
        renderItem={({ item }: any) => {
          return <Comment text={item.text} media={item.media}
                          key={item.id} id={item.id} isEditable={!postId}/>;
        }}
      />
      <ActivityIndicator animating={networkStatus === NetworkStatus.fetchMore
        || loading}/>
    </>
  );
};

export default Comments;
