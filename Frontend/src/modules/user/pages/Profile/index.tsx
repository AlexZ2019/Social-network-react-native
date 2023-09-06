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
import { ActivityIndicator } from '@ant-design/react-native';
import { useRoute } from '@react-navigation/native';
import { USER_QUERY } from '../../graphql/queries/user';

const Profile = () => {
  const { data: currentUser } = useQuery(CURRENT_USER_QUERY);
  const [fetch, { loading: isUserLoad, data }] = useLazyQuery(USER_QUERY);
  const currentRoute = useRoute();
  // @ts-ignore
  const userId = currentRoute.params?.id;
  const user = userId && data?.getUser || currentUser?.getCurrentUser;
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
  
  if (!currentUser || isUserLoad) {
    return <ActivityIndicator/>;
  }
  return (
    <>
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
