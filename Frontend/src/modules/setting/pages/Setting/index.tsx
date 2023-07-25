import { ScrollView, Text } from 'react-native';
import { Flex, Icon, List } from '@ant-design/react-native';
import { useLogout } from '../../../auth/hooks/logout';

const logoutStyle = {
  marginLeft: 5,
};
const Setting = () => {
  const logout = useLogout();
  
  return <ScrollView>
    <List>
      <List.Item>
        <Flex onPress={logout}>
          <Icon name="logout"/>
          <Text style={logoutStyle}>Logout</Text>
        </Flex>
      </List.Item>
    </List>
  </ScrollView>;
};

export default Setting;
