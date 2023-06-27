import { NetworkStatus, useQuery } from '@apollo/client';
import { GET_POSTS } from '../../graphql/queries/getPosts';
import { FlatList } from 'react-native';
import Post from '../Post';
import { ActivityIndicator } from '@ant-design/react-native';
import * as React from 'react';
import { useState } from 'react';
import { PostType } from '../../types';

type Props = {
  userId: number | undefined
}

const Posts = ({ userId }: Props) => {
  const [page, setPage] = useState<number>(1);
  const { data, loading, fetchMore, networkStatus } = useQuery(GET_POSTS, {
    variables: {
      userId,
    },
  });
  
  const getMorePosts = async () => {
    if (page < data?.getUserPosts.pages) {
      setPage(prevState => prevState + 1);
      await fetchMore({ variables: { page: page + 1, userId } });
    }
  };
  
  return (
    <>
      <FlatList
        data={data?.getUserPosts.posts}
        onEndReached={getMorePosts}
        onEndReachedThreshold={0.25}
        renderItem={({ item }: PostType) => {
          return <Post text={item.text} media={item.media} userId={userId}
                       key={item.id} id={item.id} isEditable={!userId}
                       name={item.name} nickname={item.nickname}
                       like={item.like}
          />;
        }}
      />
      <ActivityIndicator animating={networkStatus === NetworkStatus.fetchMore
        || loading}/>
    </>
  );
};

export default Posts;
