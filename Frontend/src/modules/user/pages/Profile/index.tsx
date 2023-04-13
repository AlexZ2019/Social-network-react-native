import { useMutation, useQuery } from '@apollo/client';
import { USER_QUERY } from '../../graphql/queries/user';
import UserInfo from '../../components/UserInfo';
import ProfileHeader from '../../components/ProfileHeader';
import React, { useState } from 'react';
import EditUserForm from '../../components/EditUserForm';
import { IUserInfo } from '../../../auth/types';
import { EDIT_USER_MUTATION } from '../../graphql/mutations/editUser';
import Posts from '../../../post/components/Posts';
import CreatePost from '../../../post/components/CreatePost';

const Profile = ({ id }: { id?: number }) => {
  const { data } = useQuery(USER_QUERY);
  const [isEditProfile, setIsEditProfile] = useState<Boolean>(false);
  const [editUser, { loading }] = useMutation(EDIT_USER_MUTATION);
  const onSubmit = async (data: IUserInfo): Promise<void> => {
    await editUser({
      variables: data, onCompleted: () => {
        setIsEditProfile(false);
      },
    });
  };
  
  return (
    <>
      <ProfileHeader nickname={data.getCurrentUser.nickname}
                     email={data.getCurrentUser.email}
                     serIsEditProfile={setIsEditProfile}
                     isEditProfile={isEditProfile}
      />
      {isEditProfile && !id
        ? <EditUserForm user={data.getCurrentUser} onSubmit={onSubmit}
                        loading={loading}/>
        : <UserInfo user={data.getCurrentUser}/>}
      <CreatePost/>
      <Posts isEditable/>
    </>
  );
};

export default Profile;
