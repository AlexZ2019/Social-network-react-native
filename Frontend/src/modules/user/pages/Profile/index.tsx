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
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { USER_QUERY } from '../../graphql/queries/user';

const Profile = () => {
  const { data: currentUser } = useQuery(CURRENT_USER_QUERY);
  const [fetch, { loading: isUserLoad, data }] = useLazyQuery(USER_QUERY,
    { fetchPolicy: 'no-cache' });
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const userId = route.params?.id;
  const user = data?.getUser || currentUser;
  const [isEditProfile, setIsEditProfile] = useState<Boolean>(false);
  const [editUser, { loading }] = useMutation(EDIT_USER_MUTATION);
  
  useEffect(() => {
    fetch({ variables: { id: userId } });
  }, [userId]);
  const onSubmit = async (data: IUserInfo): Promise<void> => {
    await editUser({
      variables: data, onCompleted: () => {
        setIsEditProfile(false);
      },
    });
  };
  
  const goBack = () => {
    const routes = navigation.getState()?.routes;
    navigation.navigate(routes[1].name);
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
      <CreatePost/>
      <Posts isEditable/>
    </>
  );
};

export default Profile;
