import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/navigation/RootNavigator';
import RNBootsplash from 'react-native-bootsplash';
import {store, YelpStoreContext} from './src/models';
import {
  configurePersistable,
  getPersistedStore,
  makePersistable,
} from 'mobx-persist-store';
import RNAsyncStorage from '@react-native-async-storage/async-storage';
import {protect, unprotect} from 'mobx-state-tree';

const RootStore = store.create({
  count: 0,
});

function App(): JSX.Element {
  configurePersistable({
    expireIn: 86400000,
    storage: RNAsyncStorage,
    removeOnExpiration: true,
  });

  unprotect(RootStore);
  makePersistable(RootStore, {
    name: 'RootStore',
    properties: ['count', 'increamentCount'],
  }).then(() => {
    protect(RootStore);
  });

  getPersistedStore(RootStore).then(res => {
    console.log('RSE :_ ', res);
  });

  return (
    <YelpStoreContext.Provider value={RootStore}>
      <NavigationContainer
        onReady={() =>
          RNBootsplash.hide({
            duration: 500,
            fade: true,
          })
        }>
        <RootNavigator />
      </NavigationContainer>
    </YelpStoreContext.Provider>
  );
}

export default App;
