import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator();

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
        <NavigationContainer>
          <Stack.Navigator>
            {modules.routes.map((route: IRoute, index) => {
              switch (route.type) {
                case RouteType.NotAuth:
                  return (
                    <Stack.Screen key={index} name={route.path}
                                  children={() => (
                                    <NotAuthRouteWrapper>{route.page}</NotAuthRouteWrapper>
                                  )}/>
                  );
                case RouteType.Auth:
                  return (
                    <Stack.Screen key={index} name={route.path}
                                  children={() => (
                                    <PrivetRouteWrapper>{route.page}</PrivetRouteWrapper>
                                  )}/>
                  );
                default:
                  return <Stack.Screen key={index} name={route.path}
                                       component={route.page}/>;
              }
            })}
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </ApolloProvider>
  );
}
