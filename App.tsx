import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import TestScreen from './src/screens/TestScreen';
import { initDatabase } from './src/utils/database';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDatabase().then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log('App: useEffect setItemAsync');

    SecureStore.setItemAsync(
      'loggedInUser',
      '{"id":"84615","name":"Someusername","token":"eyJ0eXAiOiJKV1QiLGJhbGciOiJIUzI1NiJ5.eyJjaGVja2luX2FwcF91c2VyX2lkIjo4MhYxNSwiYm94X29mZmljZV9pZCI6NTc0MzF9.IWbOXvTY1ClKEovJzHhwN2XvJZ614wpxZZcdJpO0HUE","device_id":"1155","unique_device_id":"60054aa6-b1d8-442b-8fdc-b2c96d66ff77"}'
    )
      .then(() => {
        console.log('setItemAsync OK');
      })
      .catch((_error) => {
        console.log('setItemAsync ERROR');
      });
  }, []);

  useEffect(() => {
    console.log('App: useEffect Interval');

    const interval = setInterval(() => {
      console.log('App: Interval start');
      SecureStore.getItemAsync('loggedInUser')
        .then((value) => {
          console.log('App: Resolved');
          console.log(value);
        })
        .catch(() => {
          console.log('App: Rejected');
        })
        .finally(() => {
          console.log('App: Finally');
        });
      console.log('App: Interval end');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return loading ? (
    <View>
      <Text style={{ fontSize: 50, color: 'red' }}>Loading</Text>
    </View>
  ) : (
    <TestScreen />
  );
}
