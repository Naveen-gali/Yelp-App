import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import RNBootsplash from 'react-native-bootsplash';
import {PrimaryStackNavigator} from './PrimaryStack';
import {useColorScheme} from 'react-native';
import {DarkTheme, LightTheme} from '../theme';
import {RootStoreContext} from '../models';

const RootNavigator = () => {
  const {settings} = useContext(RootStoreContext);
  const onNavigationContainerReady = () => {
    // Handle Actions before the Splash SCreen hides
    settings.DeviceLanguage();
    settings.DeviceTheme();
    RNBootsplash.hide({
      duration: 500,
      fade: true,
    });
  };

  const theme = useColorScheme();

  return (
    <NavigationContainer
      onReady={onNavigationContainerReady}
      theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <PrimaryStackNavigator />
    </NavigationContainer>
  );
};

export {RootNavigator};
