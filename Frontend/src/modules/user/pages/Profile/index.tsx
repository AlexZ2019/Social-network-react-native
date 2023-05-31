import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../../graphql/queries/currentUser';
import UserInfo from '../../components/UserInfo';
import ProfileHeader from '../../components/ProfileHeader';
import React, { useEffect, useState } from 'react';
import EditUserForm from '../../components/EditUserForm';
import { IUserInfo } from '../../../auth/types';
import { EDIT_USER_MUTATION } from '../../graphql/mutations/editUser';
import Posts from '../../../post/components/Posts';
import CreatePost from '../../../post/components/CreatePost';
import { ActivityIndicator, Button } from '@ant-design/react-native';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { USER_QUERY } from '../../graphql/queries/user';

const Profile = () => {
  const { data: currentUser } = useQuery(CURRENT_USER_QUERY);
  const [fetch, { loading: isUserLoad, data }] = useLazyQuery(USER_QUERY);
  const navigation = useNavigation();
  const currentRoute = useRoute();
  const isFocusedScreen = useIsFocused();
  // @ts-ignore
  const userId = currentRoute.params?.id;
  const user = userId && data?.getUser || currentUser?.getCurrentUser;
  const [isEditProfile, setIsEditProfile] = useState<Boolean>(false);
  const [editUser, { loading }] = useMutation(EDIT_USER_MUTATION);
  
  useEffect(() => {
    fetch({ variables: { id: userId } });
  }, [userId]);
  
  useEffect(() => {
    if (!isFocusedScreen) {
      navigation.setParams({ id: undefined });
    }
  }, [isFocusedScreen]);
  
  const onSubmit = async (data: IUserInfo): Promise<void> => {
    await editUser({
      variables: data, onCompleted: () => {
        setIsEditProfile(false);
      },
    });
  };
  
  const goBack = () => {
    const route = navigation.getState()?.
      routes.
      find((route => route.name === currentRoute.params?.pageToGoBack));
    route ? navigation.navigate(route) : navigation.goBack();
    navigation.setParams({ id: undefined });
  };
  
  if (!currentUser || isUserLoad) {
    return <ActivityIndicator/>;
  }
  return (
    <>
      {data?.getUser && <Button onPress={goBack}>Go Back</Button>}
      <ProfileHeader nickname={user?.nickname}
                     email={user?.email}
                     serIsEditProfile={setIsEditProfile}
                     isEditProfile={isEditProfile}
      />
      {isEditProfile && !userId
        ? <EditUserForm user={currentUser.getCurrentUser} onSubmit={onSubmit}
                        loading={loading}/>
        : <UserInfo user={user}/>}
      {!data?.getUser && <CreatePost/>}
      <Posts userId={userId}/>
    </>
  );
};

export default Profile;
