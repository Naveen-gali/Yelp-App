import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from '../../screens';
import {
  PrimaryStackParams,
  PrimaryStackRoute,
} from './PrimaryStackNavigator.types';

const PrimaryStack = createNativeStackNavigator<PrimaryStackParams>();

const PrimaryStackNavigator = () => {
  return (
    <PrimaryStack.Navigator>
      <PrimaryStack.Screen
        name={PrimaryStackRoute.Home}
        component={HomeScreen}
      />
    </PrimaryStack.Navigator>
  );
};

export {PrimaryStackNavigator};
