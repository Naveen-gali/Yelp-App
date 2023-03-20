import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

export enum RouteName {
  Home = 'Home',
}

export type RootNavigatorParams = {
  [RouteName.Home]: undefined;
};

const Stack = createNativeStackNavigator<RootNavigatorParams>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={RouteName.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export {RootNavigator};
