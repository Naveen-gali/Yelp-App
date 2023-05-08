//TODO: Remove next line comment after finding the fix in meeting
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PrimaryStackNavigator} from '../PrimaryStack';
import {BottomTabRoute} from './BottomTabNavigator.types';
import {CustomIcon, CustomIconNames} from '../../components';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';

const BottomTabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name={BottomTabRoute.Search}
        component={PrimaryStackNavigator}
        options={{
          tabBarIcon: ({size, color}) => (
            <CustomIcon
              name={CustomIconNames.Search}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name={BottomTabRoute.Me}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <CustomIcon
              name={CustomIconNames.Profile}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </BottomTabs.Navigator>
  );
};

export {BottomTabNavigator};
