import { View } from 'react-native';
import {
  Icon,
  TabBar,
} from '@ant-design/react-native';
import friendPaths from '../../../friend/constants/routes';
import newsPaths from '../../../News/constants/routes';
import userPaths from '../../../user/constants/routes';
import { useNavigation } from '@react-navigation/native';

const Navigation = ({ tab }: { tab: string }) => {
  const navigation = useNavigation();
  const onChangeTab = (tabName: string) => {
    navigation.navigate(tabName);
  };
  
  return (
    <View>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#f5f5f5">
        <TabBar.Item
          title={newsPaths.news}
          icon={<Icon name="home"/>}
          selected={tab === newsPaths.news}
          onPress={() => onChangeTab(newsPaths.news)}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="ordered-list"/>}
          title={friendPaths.friends}
          selected={tab === friendPaths.friends}
          onPress={() => onChangeTab(friendPaths.friends)}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="like"/>}
          title={userPaths.users}
          selected={tab === userPaths.users}
          onPress={() => onChangeTab(userPaths.users)}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="user"/>}
          title={userPaths.profile}
          selected={tab === userPaths.profile}
          onPress={() => onChangeTab(userPaths.profile)}
        >
        </TabBar.Item>
      </TabBar>
    </View>
  );
};

export default Navigation;
