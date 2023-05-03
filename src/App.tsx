import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStore, RootStoreContext, setupStore} from './models';
import {RootNavigator} from './navigation';

function App(): JSX.Element {
  const [settingUp, setSettingUp] = useState(true);

  useEffect(() => {
    setupStore().then(() => setSettingUp(false));
  });

  const renderContent = () => {
    if (settingUp) {
      return (
        <View style={styles.setupScreen}>
          <ActivityIndicator size={'large'} color={'red'} />
          <Text>Setting Up App!</Text>
        </View>
      );
    } else {
      return (
        <GestureHandlerRootView style={styles.gestureRootView}>
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
