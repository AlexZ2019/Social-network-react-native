import {
  DocumentNode,
  NetworkStatus,
  TypedDocumentNode,
  useQuery,
} from '@apollo/client';
import UserMinimized from '../../components/UserMinimized';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
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
  const [page, setPage] = useState<number>(1);
  const { loading, data, fetchMore, refetch, networkStatus } = useQuery(query);
  const userData = data?.getUsers || data?.getFriends;
  const getMoreUsers = async () => {
    if (page < userData.pages) {
      setPage(prevState => prevState + 1);
      if (searchText) {
        await fetchMore(
          { variables: { page: page + 1, searchValue: searchText } });
      } else {
        await fetchMore({ variables: { page: page + 1 } });
      }
    }
  };
  
  const openProfile = (id: number) => {
    navigation.navigate(constants.profile, { id });
  };
  
  return (
    <>
      <UserSearch searchText={searchText} setSearchText={setSearchText}
                  refetchUsers={refetch}/>
      <FlatList data={userData?.users}
                onEndReached={getMoreUsers}
                onEndReachedThreshold={0.25}
                renderItem={({ item }) => {
                  return <UserMinimized isFriend={item.isFriend}
                                        email={item.email}
                                        nickname={item.nickname} sex={item.sex}
                                        key={item.id} onPress={openProfile}
                                        id={item.id}/>;
                }}/>
      <ActivityIndicator animating={networkStatus === NetworkStatus.fetchMore
        || loading}/>
    </>
  );
  
};

export default Users;
