import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/navigation/RootNavigator';
import RNBootsplash from 'react-native-bootsplash';
import {store, RootStoreContext} from './src/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist} from 'mst-persist';

const RootStore = store.create({
  count: 0,
});

function App(): JSX.Element {
  persist('RootStore', RootStore, {
    storage: AsyncStorage,
    whitelist: ['count'],
  });

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
