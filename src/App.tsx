import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RNBootsplash from 'react-native-bootsplash';
import {RootStore, RootStoreContext} from './models';
import {RootNavigator} from './navigation/RootNavigator';

function App(): JSX.Element {
  return (
    <RootStoreContext.Provider value={RootStore}>
      <NavigationContainer
        onReady={() =>
          RNBootsplash.hide({
            duration: 500,
            fade: true,
          })
        }>
        <RootNavigator />
      </NavigationContainer>
    </RootStoreContext.Provider>
  );
}

export default App;
