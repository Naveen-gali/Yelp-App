import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RNBootsplash from 'react-native-bootsplash';
import {PrimaryStackNavigator} from './PrimaryStack';
import {useColorScheme} from 'react-native';
import {DarkTheme, LightTheme} from '../theme';

const RootNavigator = () => {
  const onNavigationContainerReady = () => {
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
