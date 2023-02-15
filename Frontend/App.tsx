import {
  NavigationContainer,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import modules from './src/modules';
import {
  IRoute,
  RouteType,
} from './src/modules/common/interfaces/moduleInterfaces';
import UserProvider from './src/modules/user/providers/userProvider';
import PrivetRouteWrapper
  from './src/modules/auth/components/RouteWrappers/PrivetRouteWrapper';
import NotAuthRouteWrapper
  from './src/modules/auth/components/RouteWrappers/NotAuthRouteWrapper';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/modules/apollo';
import constants from './src/modules/News/constants';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'react-native';


const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoaded] = useFonts({
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
    antfill: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
  });
  if (!isLoaded) {
    return null;
  }
 
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <StatusBar/>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName={constants.news}>
            {modules.routes.map((route: IRoute, index) => {
              switch (route.type) {
                case RouteType.NotAuth:
                  return (
                    <Drawer.Screen key={index} name={route.path}
                                   options={{headerShown: false, hidden: true, drawerItemStyle: { display: 'none' }}}
                                  children={() => (
                                    <NotAuthRouteWrapper>{route.page}</NotAuthRouteWrapper>
                                  )}/>
                  );
                case RouteType.Auth:
                  return (
                    <Drawer.Screen key={index} name={route.path}
                                  children={() => (
                                    <PrivetRouteWrapper>{route.page}</PrivetRouteWrapper>
                                  )}/>
                  );
                default:
                  return <Stack.Screen key={index} name={route.path}
                                       children={() => route.page}/>;
              }
            })}
          </Drawer.Navigator>
        </NavigationContainer>
      </UserProvider>
    </ApolloProvider>
  );
}
