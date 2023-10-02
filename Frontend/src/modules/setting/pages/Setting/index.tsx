import { ScrollView, Text } from 'react-native';
import { Flex, Icon, List } from '@ant-design/react-native';
import { useLogout } from '../../../auth/hooks/logout';
import EditUserForm from '../../../user/components/EditUserForm';
import React from 'react';

const textStyle = {
  marginLeft: 5,
};
const Setting = () => {
  const logout = useLogout();
  
  return <ScrollView>
    <List>
      <List.Item>
        <EditUserForm/>
      </List.Item>
      <List.Item>
        <Flex onPress={logout}>
          <Icon name="logout"/>
          <Text style={textStyle}>Logout</Text>
        </Flex>
      </List.Item>
    </List>
  </ScrollView>;
};

export default Setting;
