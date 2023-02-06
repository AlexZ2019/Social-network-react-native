import { ApolloProvider } from '@apollo/client';
import { client } from './src/modules/apollo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import LoginPage from './src/modules/auth/pages/LoginPage';

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
            <Stack.Screen name="Login" component={LoginPage}/>
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </ApolloProvider>
  );
}
