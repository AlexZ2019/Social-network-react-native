import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '../../graphql/queries/users';
import { ActivityIndicator, Button } from '@ant-design/react-native';
import UserMinimized from '../../components/UserMinimized';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import UserSearch from '../../components/UserSearch';

const Users = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [page, setPage] = useState(1);
  const { loading, data, fetchMore, refetch } = useQuery(USERS_QUERY);
  const getMoreUsers = async () => {
    setPage((prevState) => prevState + 1);
    if (searchText) {
      await fetchMore({ variables: { page, searchValue: searchText } });
    } else {
      await fetchMore({ variables: { page } });
    }
  };
  if (loading) {
    return <ActivityIndicator/>;
  }
  return (
    <>
      <UserSearch searchText={searchText} setSearchText={setSearchText}
                  refetchUsers={refetch}/>
      <FlatList data={data?.getUsers?.users} renderItem={({ item }) => {
        return <UserMinimized isFriend={item.isFriend} email={item.email}
                              nickname={item.nickname} sex={item.sex}
                              key={item.id}/>;
      }}/>
      {data?.getUsers?.pages > page &&
        <Button onPress={getMoreUsers}>Show More</Button>}
    </>
  );
  
};

export default Users;
