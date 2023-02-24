import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../../graphql/queries/user';
import { useNavigation } from '@react-navigation/native';
import UserInfo from '../../components/UserInfo';
import ProfileHeader from '../../components/ProfileHeader';

const Profile = () => {
  
  const { data } = useQuery(USER_QUERY);
  const navigation = useNavigation();
  
  return (
    <>
      <ProfileHeader nickname={data.getCurrentUser.nickname}
                     email={data.getCurrentUser.email}/>
      <UserInfo user={data.getCurrentUser}/>
    </>
  );
};

export default Profile;
