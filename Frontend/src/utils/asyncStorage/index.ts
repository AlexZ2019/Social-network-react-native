import AsyncStorage from '@react-native-async-storage/async-storage';

export const setTokensToAsyncStorage = async (tokens: { accessToken: string; refreshToken: string }) => {
  await AsyncStorage.setItem('accessToken', tokens.accessToken);
  await AsyncStorage.setItem('refreshToken', tokens.refreshToken);
};
