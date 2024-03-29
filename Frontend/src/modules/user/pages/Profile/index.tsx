import { useLazyQuery, useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../../graphql/queries/currentUser';
import UserInfo from '../../components/UserInfo';
import ProfileHeader from '../../components/ProfileHeader';
import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (userId) {
      fetch({ variables: { id: userId } });
    }
  }, [userId]);
  
  if (!currentUser || isUserLoad) {
    return <ActivityIndicator/>;
  }
  return (
    <>
      <ProfileHeader nickname={user?.nickname}
                     email={user?.email}
                     image={user?.image}
      />
      <UserInfo user={user}/>
      {!data?.getUser && <CreatePost/>}
      <Posts userId={userId}/>
    </>
  );
};

export default Profile;
