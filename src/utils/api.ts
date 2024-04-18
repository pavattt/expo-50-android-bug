import * as SecureStore from 'expo-secure-store';

export const fetchEvents = async () => {
  const accessToken = JSON.parse(await SecureStore.getItemAsync('loggedInUser'))?.token;
  console.log(accessToken);

  return []; // fetched events from API
};