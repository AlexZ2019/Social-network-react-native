import FlexItem from '@ant-design/react-native/es/flex/FlexItem';
import { Image, Text } from 'react-native';
import { Button, Flex } from '@ant-design/react-native';
import { Dispatch, SetStateAction } from 'react';

const ProfileHeader = ({
  nickname,
  email,
  serIsEditProfile,
  isEditProfile,
  image,
}: {
  nickname?: string, email?: string,
  serIsEditProfile: Dispatch<SetStateAction<Boolean>>,
  isEditProfile: Boolean,
  image?: string;
}) => {
  return (
    <Flex>
      <FlexItem>
        <Image source={image ? { uri: image }
          : require('../../../../assets/user/default-avatar.png')}
               style={{ width: 45, height: 45 }}/>
        <Text>{nickname || email}</Text>
      </FlexItem>
      <FlexItem>
        <Button type="primary" style={{ width: 45, marginLeft: 125 }}
                size="small"
                onPress={() => serIsEditProfile(!isEditProfile)}>Edit</Button>
      </FlexItem>
    </Flex>
  );
};

export default ProfileHeader;
