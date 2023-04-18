import React, {useEffect} from 'react';
import {setupStore, RootStoreContext, RootStore} from './models';
import {RootNavigator} from './navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  useEffect(() => {
    setupStore();
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RootStoreContext.Provider value={RootStore}>
        <RootNavigator />
      </RootStoreContext.Provider>
    </GestureHandlerRootView>
  );
}

export default App;
