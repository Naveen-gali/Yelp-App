import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStore, RootStoreContext, setupStore} from './models';
import {RootNavigator} from './navigation';

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
