import { Button, Card, Flex } from '@ant-design/react-native';
import { Image, Text } from 'react-native';

type Props = {
  id: number;
  userImage?: string;
  nickname?: string;
  firstname?: string;
  lastname?: string;
  sex?: string;
  isFriend: boolean;
  email: string;
  onPress: (id: number) => void;
}
const UserMinimized = ({
  id,
  userImage,
  nickname,
  firstname,
  lastname,
  sex,
  isFriend,
  email,
  onPress,
}: Props) => {
  return (
    <Card>
      <Card.Body>
        <Flex onPress={() => onPress(id)}>
          <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
            <Image style={{ width: 56, height: 56 }} source={userImage ||
              require('../../../../assets/user/default-avatar.png')}/>
            <Text>{nickname || email}</Text>
          </Flex.Item>
          <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
            <Text>{sex}</Text>
            <Button>{isFriend ? 'Remove friend' : 'Add friend'}</Button>
          </Flex.Item>
        </Flex>
      </Card.Body>
    </Card>);
};

export default UserMinimized;
