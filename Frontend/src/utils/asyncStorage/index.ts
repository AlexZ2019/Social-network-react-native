import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorageValue = async (key: string, value: string) => {
  await AsyncStorage.setItem.setItem(key, value);
};

export const getAsyncStorageValue = (key: string) => {
  return AsyncStorage.getItem(key);
};

export const removeAsyncStorageValue = (key: string) => {
  return AsyncStorage.removeItem(key);
};

export const setTokensToAsyncStorage = async (tokens: { accessToken: string; refreshToken: string }) => {
  await setAsyncStorageValue.setItem('accessToken', tokens.accessToken);
  await setAsyncStorageValue.setItem('refreshToken', tokens.refreshToken);
};
