import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RNBootsplash from 'react-native-bootsplash';
import {PrimaryStackNavigator} from './PrimaryStack';

const RootNavigator = () => {
  const onNavigationContainerReady = () => {
    RNBootsplash.hide({
      duration: 500,
      fade: true,
    });
  };

  return (
    <NavigationContainer onReady={onNavigationContainerReady}>
      <PrimaryStackNavigator />
    </NavigationContainer>
  );
};

export {RootNavigator};
