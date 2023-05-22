import { DocumentNode, TypedDocumentNode, useQuery } from '@apollo/client';
import { ActivityIndicator, Button } from '@ant-design/react-native';
import UserMinimized from '../../components/UserMinimized';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import UserSearch from '../../components/UserSearch';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import constants from '../../constants';

type Props = {
  query: DocumentNode | TypedDocumentNode;
  pageName: string;
}
const Users = ({ query, pageName }: Props) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [searchText, setSearchText] = useState<string>('');
  const [page, setPage] = useState(1);
  const { loading, data, fetchMore, refetch } = useQuery(query);
  const userData = data?.getUsers || data?.getFriends;
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
  const openProfile = (id: number) => {
    navigation.navigate(constants.profile, { id, pageToGoBack: pageName });
  };
  
  return (
    <>
      <UserSearch searchText={searchText} setSearchText={setSearchText}
                  refetchUsers={refetch}/>
      <FlatList data={userData?.users} renderItem={({ item }) => {
        return <UserMinimized isFriend={item.isFriend} email={item.email}
                              nickname={item.nickname} sex={item.sex}
                              key={item.id} onPress={openProfile}
                              id={item.id}/>;
      }}/>
      {userData?.pages > page &&
        <Button onPress={getMoreUsers}>Show More</Button>}
    </>
  );
  
};

export default Users;
