import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RNBootsplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStore, RootStoreContext, setupStore} from './models';
import {RootNavigator} from './navigation';
import remoteConfig from '@react-native-firebase/remote-config';

function App(): JSX.Element {
  const [isSettingStore, setIsSettingStore] = useState(true);

  const fetchRemoteConfig = async () => {
    await remoteConfig().fetch(0);
    await remoteConfig().fetchAndActivate();
  };

  useEffect(() => {
    setupStore()
      .then(() => fetchRemoteConfig())
      .then(() => {
        setIsSettingStore(false);
        RNBootsplash.hide({
          duration: 500,
          fade: true,
        });
      });
  });

  const renderContent = () => {
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

  return renderContent();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
