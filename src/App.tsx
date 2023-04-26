import React, {useEffect} from 'react';
import {setupStore, RootStoreContext, RootStore} from './models';
import {RootNavigator} from './navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

function App(): JSX.Element {
  useEffect(() => {
    setupStore();
  });

  return (
    <GestureHandlerRootView style={styles.gestureRootView}>
      <RootStoreContext.Provider value={RootStore}>
        <RootNavigator />
      </RootStoreContext.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureRootView: {
    flex: 1,
  },
});

export default App;
