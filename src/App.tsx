import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RNBootsplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStore, RootStoreContext, setupStore} from './models';
import {RootNavigator} from './navigation';

function App(): JSX.Element {
  const [isSettingStore, setIsSettingStore] = useState(true);

  useEffect(() => {
    setupStore().then(() => {
      setIsSettingStore(false);
      RNBootsplash.hide({
        duration: 500,
        fade: true,
      });
    });
  });

  const content = () => {
    if (isSettingStore) {
      return <View style={styles.container} />;
    } else {
      return (
        <GestureHandlerRootView style={styles.container}>
          <RootStoreContext.Provider value={RootStore}>
            <RootNavigator />
          </RootStoreContext.Provider>
        </GestureHandlerRootView>
      );
    }
  };

  return content();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
