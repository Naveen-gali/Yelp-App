import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {persist} from 'mst-persist';
import React from 'react';
import RNBootsplash from 'react-native-bootsplash';
import {RootStoreContext, store} from './src/models';
import {RootNavigator} from './src/navigation/RootNavigator';

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
