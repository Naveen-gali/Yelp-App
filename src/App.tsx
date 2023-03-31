import React, {useEffect} from 'react';
import {setupStore, RootStoreContext, RootStore} from './models';
import {RootNavigator} from './navigation';

function App(): JSX.Element {
  useEffect(() => {
    setupStore();
  });

  return (
    <RootStoreContext.Provider value={RootStore}>
      <RootNavigator />
    </RootStoreContext.Provider>
  );
}

export default App;
