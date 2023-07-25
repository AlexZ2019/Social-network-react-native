import { Flex, Icon, Text } from '@ant-design/react-native';
import React from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import constants from '../../../setting/constants';

const styles = {
  width: '100%',
};

const NavigationHeader = (props: any) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  
  return <Flex justify="between" style={styles}>
    <Text>{props.children}</Text>
    <Icon name="setting" size="md"
          onPress={() => navigation.navigate(constants.setting)}/>
  </Flex>;
};

export default NavigationHeader;
