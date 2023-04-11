import { useQuery } from '@apollo/client';
import { GetPosts } from '../../graphql/queries/getPosts';
import { FlatList } from 'react-native';
import Post from '../Post';
import { ActivityIndicator } from '@ant-design/react-native';
import * as React from 'react';

const Posts = () => {
  const { data, loading } = useQuery(GetPosts);
  if (loading) {
    return <ActivityIndicator/>;
  }
  
  return (
    <FlatList
      data={data.getUserPosts}
      renderItem={({ item }: any) => {
        return <Post text={item.text} media={item.media}
                     key={item.id}/>;
      }}
    />
  );
};

export default Posts;
