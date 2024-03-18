import React, { useEffect } from 'react';
import { Alert, Button, SafeAreaView, ScrollView } from 'react-native';
import { pickFile, read } from '@dr.pogodin/react-native-fs';
import TestBaseMethods from './TestBaseMethods';
import TestConstants from './TestConstants';
import { start, stop } from './testServer';

export default function App() {
  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, []);

  return React.createElement(
    SafeAreaView,
    null,
    React.createElement(
      ScrollView,
      null,
      React.createElement(TestConstants, null),
      React.createElement(TestBaseMethods, null),
      React.createElement(Button, {
        onPress: async () => {
          const res = await pickFile();
          Alert.alert(`Picked ${res.length} file(s)`, res.join('; '));

          for (let i = 0; i < res.length; ++i) {
            const begin = await read(res[0], 10);
            Alert.alert(`File #${i + 1} starts with`, begin);
          }
        },
        title: 'pickFile()',
      })
    )
  );
}
