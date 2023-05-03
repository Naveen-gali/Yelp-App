import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import RNBootsplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStore, RootStoreContext, setupStore} from './models';
import {RootNavigator} from './navigation';

function App(): JSX.Element {
  useEffect(() => {
    setupStore().then(() => {
      RNBootsplash.hide({
        duration: 500,
        fade: true,
      });
    });
  });

  const renderContent = () => {
    return (
      <GestureHandlerRootView style={styles.gestureRootView}>
        <RootStoreContext.Provider value={RootStore}>
          <RootNavigator />
        </RootStoreContext.Provider>
      </GestureHandlerRootView>
    );
  };

  return renderContent();
}

const styles = StyleSheet.create({
  gestureRootView: {
    flex: 1,
  },
  setupScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
