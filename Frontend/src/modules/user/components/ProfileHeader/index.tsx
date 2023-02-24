import FlexItem from '@ant-design/react-native/es/flex/FlexItem';
import { Image, Text } from 'react-native';
import { Button, Flex } from '@ant-design/react-native';

const ProfileHeader = ({
  nickname,
  email,
}: { nickname?: string, email?: string }) => {
  return (
    <Flex>
      <FlexItem>
        <Image source={require('../../../../assets/user/default-avatar.png')}
               style={{ width: 45, height: 45 }}/>
        <Text>{nickname || email}</Text>
      </FlexItem>
      <FlexItem>
        <Button type="primary" style={{ width: 45, marginLeft: 125 }}
                size="small">Edit</Button>
      </FlexItem>
    </Flex>
  );
};

export default ProfileHeader;
