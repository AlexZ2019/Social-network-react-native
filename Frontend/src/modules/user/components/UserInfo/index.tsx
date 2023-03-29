import { Accordion, Card, Flex } from '@ant-design/react-native';
import { Text, View } from 'react-native';
import { IUser } from '../../types';
import { useState } from 'react';

const UserInfo = ({ user }: { user: IUser }) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const onChange = (activeSections: number[]) => {
    setActiveSections(activeSections);
  };
  
  return (
    <View>
      <Accordion onChange={onChange} activeSections={activeSections}>
        <Accordion.Panel header="Profile Info">
          <Card full>
            <Card.Body>
              <Flex justify="between" style={{ padding: 15 }}>
                <Flex direction="column">
                  <Flex.Item style={{ margin: 4 }}>
                    <Text>Email</Text>
                    <Text>{user.email}</Text>
                  </Flex.Item>
                  <Flex.Item style={{ margin: 4 }}>
                    <Text>Birthday</Text>
                    <Text>{user.birthday}</Text>
                  </Flex.Item>
                </Flex>
                <Flex direction="column">
                  <Flex.Item style={{ margin: 4 }}>
                    <Text>Status</Text>
                    <Text>{user.status}</Text>
                  </Flex.Item>
                  <Flex.Item style={{ margin: 4 }}>
                    <Text>Biography</Text>
                    <Text>{user.biography}</Text>
                  </Flex.Item>
                </Flex>
              </Flex>
            </Card.Body>
          </Card>
        </Accordion.Panel>
      </Accordion>
    </View>
  );
};

export default UserInfo;
