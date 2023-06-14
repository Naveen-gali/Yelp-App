import remoteConfig from '@react-native-firebase/remote-config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RNBootsplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStore, RootStoreContext, setupStore} from './models';
import {RootNavigator} from './navigation';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';

function App(): JSX.Element {
  const [isSettingStore, setIsSettingStore] = useState(true);

  GoogleSignin.configure({
    webClientId:
      '757548623602-8tu5l0dhdbjle9u0ovk51hfno22dhces.apps.googleusercontent.com',
  });

  const fetchRemoteConfig = async () => {
    await remoteConfig().fetch(0);
    await remoteConfig().fetchAndActivate();
  };

  const createNotificationChannel = () =>
    PushNotification.createChannel(
      {
        channelId: 'yelp-app',
        channelName: 'Yelp App',
        channelDescription: 'A Channel to get Notifications from the Yelp App',
        importance: Importance.HIGH,
        soundName: 'default',
        vibrate: true,
      },
      created => console.log('Channel Created! :- ', created),
    );

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      messaging.AuthorizationStatus.AUTHORIZED ||
      messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization STatus :- ', authStatus);
    }
  }

  useEffect(() => {
    requestUserPermission();
    createNotificationChannel();
    setupStore()
      .then(() => fetchRemoteConfig())
      .then(() => {
        setIsSettingStore(false);
        RNBootsplash.hide({
          duration: 700,
          fade: true,
        });
      });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp', JSON.stringify(remoteMessage));
    });
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('onMessage', JSON.stringify(remoteMessage));
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Initial Notification', JSON.stringify(remoteMessage));
        }
      });

    messaging()
      .getToken()
      .then(token => {
        console.log('Token :- ', token);
      });

    return unsubscribe();
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
