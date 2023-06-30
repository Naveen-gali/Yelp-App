import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthStackRoute} from './AuthStackNavigator.types';
import {LoginScreen} from '../../screens';
import {BottomTabNavigator} from '../BottomTabs';

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={AuthStackRoute.Login}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={AuthStackRoute.App}
        component={BottomTabNavigator}
      />
    </AuthStack.Navigator>
  );
};

export {AuthStackNavigator};
