import { useMutation, useQuery } from '@apollo/client';
import { USER_QUERY } from '../../graphql/queries/user';
import UserInfo from '../../components/UserInfo';
import ProfileHeader from '../../components/ProfileHeader';
import { useState } from 'react';
import EditUserForm from '../../components/EditUserForm';
import { IUserInfo } from '../../../auth/types';
import { EDIT_USER_MUTATION } from '../../graphql/mutations/editUser';

const Profile = ({ id }: { id?: number }) => {
  const { data } = useQuery(USER_QUERY);
  const [isEditProfile, serIsEditProfile] = useState<Boolean>(false);
  const [editUser] = useMutation(EDIT_USER_MUTATION);
  const onSubmit = async (data: IUserInfo): Promise<void> => {
    await editUser({ variables: data });
  };
  
  return (
    <>
      <ProfileHeader nickname={data.getCurrentUser.nickname}
                     email={data.getCurrentUser.email}
                     serIsEditProfile={serIsEditProfile}
                     isEditProfile={isEditProfile}
      />
      {isEditProfile && !id
        ? <EditUserForm user={data.getCurrentUser} onSubmit={onSubmit}/>
        : <UserInfo user={data.getCurrentUser}/>}
    </>
  );
};

export default Profile;
