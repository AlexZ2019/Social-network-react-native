import { Card, Flex } from '@ant-design/react-native';
import { Text } from 'react-native';
import { IUser } from '../../types';

const UserInfo = ({ user }: { user: IUser }) => {
  
  return (
    <Card full>
      <Card.Header
        title={user.nickname}
        thumbStyle={{ width: 30, height: 30 }}
        extra={<Text onPress={() => {}}>Edit</Text>}
      />
      <Card.Body>
        <Flex>
          <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
            <Text>Email</Text>
            <Text>{user.email}</Text>
          </Flex.Item>
          <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
            <Text>Birthday</Text>
            <Text>{user.birthday}</Text>
          </Flex.Item>
          <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
            <Text>Status</Text>
            <Text>{user.status}</Text>
          </Flex.Item>
          <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
            <Text>Biography</Text>
            <Text>{user.biography}</Text>
          </Flex.Item>
        </Flex>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
