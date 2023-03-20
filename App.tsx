import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/navigation/RootNavigator';
import RNBootsplash from 'react-native-bootsplash';

function App(): JSX.Element {
  return (
    <NavigationContainer
      onReady={() =>
        RNBootsplash.hide({
          duration: 500,
          fade: true,
        })
      }>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
