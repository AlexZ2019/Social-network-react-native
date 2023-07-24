import { FlatList } from 'react-native';
import { NetworkStatus, useQuery } from '@apollo/client';
import { GET_NEWS_QUERY } from '../../graphql/queries/news';
import { useState } from 'react';
import Post from '../../../post/components/Post';
import { ActivityIndicator } from '@ant-design/react-native';
import * as React from 'react';
import { useRoute } from '@react-navigation/native';

const News = () => {
  const currentRoute = useRoute();
  // @ts-ignore
  const userId = currentRoute.params?.id;
  const [page, setPage] = useState<number>(1);
  const { data, loading, fetchMore, networkStatus } = useQuery(GET_NEWS_QUERY);
  
  const getMoreNews = async () => {
    if (page < data?.getNews.pages) {
      setPage(prevState => prevState + 1);
      await fetchMore({ variables: { page: page + 1 } });
    }
  };
  
  return (
    <>
      <FlatList
        data={data?.getNews.posts}
        onEndReached={getMoreNews}
        onEndReachedThreshold={0.25}
        renderItem={({ item }) => {
          return <Post text={item.text} media={item.media} userId={userId}
                       key={item.id} id={item.id} isEditable={false}
                       name={item.name} nickname={item.nickname}
                       like={item.like} email={item.email}
          />;
        }}
      />
      <ActivityIndicator animating={networkStatus === NetworkStatus.fetchMore
        || loading}/>
    </>
  );
};

export default News;
