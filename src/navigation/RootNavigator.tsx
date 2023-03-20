import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

export enum RouteName {
  Home = 'Home',
}

export type RootNavigatorParams = {
  [RouteName.Home]: undefined;
};

const Stack = createStackNavigator<RootNavigatorParams>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={RouteName.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export {RootNavigator};
