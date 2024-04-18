import { useEffect } from 'react';
import { Text, View } from 'react-native';

import { retrieveLocalEvents } from '../database/events';
import { downloadAndSaveEvents } from '../utils/sync';

export default function TestScreen() {
  useEffect(() => {
    retrieveLocalEvents().then((events: any) => {
      console.log(events);
      if (events.length > 0) {
        return;
      }

      return downloadAndSaveEvents().then(() => {
        retrieveLocalEvents().then((events: any) => {
          console.log(events);
        });
      });
    });
  }, []);

  return (
    <View>
      <Text>Test Screen</Text>
    </View>
  );
}
