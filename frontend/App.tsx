import { store } from './redux';
import { Provider } from 'react-redux';
import React from 'react';
import AppLayout from './layout/AppLayout';
import { useFonts } from 'expo-font';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Optima-Bold': require('./assets/fonts/Optima-Bold.ttf'),
    'Optima-Italic': require('./assets/fonts/Optima-Italic.ttf'),
    'Optima-Medium': require('./assets/fonts/Optima-Medium.ttf'),
    Optima: require('./assets/fonts/Optima.ttf'),
  });
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <AppLayout />
      </RootSiblingParent>
    </Provider>
  );
}
