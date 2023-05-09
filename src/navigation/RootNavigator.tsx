import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useColorScheme} from 'react-native';
import {DarkTheme, LightTheme} from '../theme';
import {PrimaryStackNavigator} from './PrimaryStack';

const RootNavigator = () => {
  const theme = useColorScheme();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <PrimaryStackNavigator />
    </NavigationContainer>
  );
};

export {RootNavigator};
