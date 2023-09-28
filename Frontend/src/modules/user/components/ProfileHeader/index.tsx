import FlexItem from '@ant-design/react-native/es/flex/FlexItem';
import { Image, Text } from 'react-native';
import { Button, Flex } from '@ant-design/react-native';
import { Dispatch, SetStateAction } from 'react';
import UploadImage from '../../../common/components/UploadImage';
import {
  UPLOAD_USER_AVATAR_MUTATION,
} from '../../graphql/mutations/UploadUserAvatar';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../../graphql/queries/currentUser';
import {
  FILES_CLOUD_POLICY,
  FILES_CLOUD_SIGNATURE,
  FILES_CLOUD_API_KEY,
} from '@env';

const ProfileHeader = ({
  nickname,
  email,
  serIsEditProfile,
  isEditProfile,
  image,
  userId,
}: {
  nickname?: string, email?: string,
  serIsEditProfile: Dispatch<SetStateAction<Boolean>>,
  isEditProfile: Boolean,
  image?: string;
  userId?: number;
}) => {
  const [upload, { loading }] = useMutation(UPLOAD_USER_AVATAR_MUTATION, {
    update(cache, { data }) {
      const user = cache.readQuery({ query: CURRENT_USER_QUERY });
      const updatedUser = {
        getCurrentUser: {
          ...user.getCurrentUser,
          image: data.uploadUserAvatar.imageUrl,
        },
      };
      cache.writeQuery({ query: CURRENT_USER_QUERY, data: updatedUser });
    },
  });
  
  return (
    <Flex>
      <FlexItem>
        <Image source={image
          ? { uri: `${image}?policy=${FILES_CLOUD_POLICY}&signature=${FILES_CLOUD_SIGNATURE}&key=${FILES_CLOUD_API_KEY}` }
          : require('../../../../assets/user/default-avatar.png')}
               style={{ width: 45, height: 45, resizeMode: 'contain' }}/>
        <Text>{nickname || email}</Text>
      </FlexItem>
      {!userId && <UploadImage upload={upload} loading={loading}
                               uploadBtnText="Upload avatar"/>}
      <FlexItem>
        <Button type="primary" style={{ width: 45, marginLeft: 125 }}
                size="small"
                onPress={() => serIsEditProfile(!isEditProfile)}>Edit</Button>
      </FlexItem>
    </Flex>
  );
};

export default ProfileHeader;
