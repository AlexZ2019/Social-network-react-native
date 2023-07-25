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
import { StatusBar, View } from 'react-native';
import React from 'react';
import en_US from '@ant-design/react-native/lib/locale-provider/en_US';
import { Provider } from '@ant-design/react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from './src/modules/common/components/Navigation';
import NavigationHeader from './src/modules/common/components/NavigationHeader';

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
        <Provider locale={en_US}>
          <StatusBar/>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={constants.news}>
              {modules.routes.map((route: IRoute, index) => {
                switch (route.type) {
                  case RouteType.NotAuth:
                    return (
                      <Stack.Screen key={index} name={route.path}
                                    options={{ headerShown: false }}
                                    children={() => (
                                      <NotAuthRouteWrapper>{route.page}</NotAuthRouteWrapper>
                                    )}/>
                    );
                  case RouteType.Auth:
                    return (
                      <Stack.Screen key={index} name={route.path}
                                    options={{
                                      headerTitle: (props) =>
                                        <NavigationHeader {...props}/>,
                                    }}
                                    children={() => (
                                      <>
                                        <PrivetRouteWrapper>{route.page}</PrivetRouteWrapper>
                                        <Navigation tab={route.path}/>
                                      </>
                                    )}/>
                    );
                  default:
                    return <Stack.Screen key={index} name={route.path}
                                         children={() => route.page}/>;
                }
              })}
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </UserProvider>
    </ApolloProvider>
  );
}
