import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../../graphql/queries/user';
import { useNavigation } from '@react-navigation/native';
import UserInfo from '../../components/UserInfo';

const Profile = () => {
  
  const { data } = useQuery(USER_QUERY);
  const navigation = useNavigation();
  
  return (
    <UserInfo user={data}/>
  );
};

export default Profile;
