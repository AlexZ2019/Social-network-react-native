import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../graphql/queries/getPosts';
import { FlatList } from 'react-native';
import Post from '../Post';
import { ActivityIndicator } from '@ant-design/react-native';
import * as React from 'react';

type Props = {
  userId: number | undefined
}

const Posts = ({ userId }: Props) => {
  const { data, loading } = useQuery(GET_POSTS, {
    variables: {
      userId,
    },
  });
  
  if (loading) {
    return <ActivityIndicator/>;
  }
  
  return (
    <FlatList
      data={data.getUserPosts}
      renderItem={({ item }: any) => {
        return <Post text={item.text} media={item.media}
                     key={item.id} id={item.id} isEditable={!userId}/>;
      }}
    />
  );
};

export default Posts;
