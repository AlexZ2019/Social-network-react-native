import { ApolloProvider } from '@apollo/client';
import { client } from './src/providers/apollo/config';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './src/modules/auth/components/LoginForm';
import { useFonts } from 'expo-font';

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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginForm}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
