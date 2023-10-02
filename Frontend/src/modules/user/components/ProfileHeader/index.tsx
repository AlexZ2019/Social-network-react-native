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
  image,
  userId,
}: {
  nickname?: string, email?: string,
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
               style={{
                 width: 125,
                 height: 125,
                 borderRadius: 100,
                 marginBottom: 5,
                 marginTop: 5,
               }}/>
        {!userId && <UploadImage upload={upload} loading={loading}
                                 uploadBtnText="Change Photo"/>}
        <Text>{nickname || email}</Text>
      </FlexItem>
    </Flex>
  );
};

export default ProfileHeader;
