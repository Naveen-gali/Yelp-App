import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {CustomIcon, CustomIconNames} from '../../components';
import {ProfileScreen} from '../../screens';
import {PrimaryStackNavigator} from '../PrimaryStack';
import {
  BottomTabBarIconProps,
  BottomTabRoute,
} from './BottomTabNavigator.types';

const BottomTabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const tabBarIcon = (props: BottomTabBarIconProps) => {
    return (
      <CustomIcon name={props.icon} size={props.size} color={props.color} />
    );
  };

  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name={BottomTabRoute.Search}
        component={PrimaryStackNavigator}
        options={{
          tabBarIcon: props =>
            tabBarIcon({...props, icon: CustomIconNames.Search}),
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name={BottomTabRoute.Me}
        component={ProfileScreen}
        options={{
          tabBarIcon: props =>
            tabBarIcon({...props, icon: CustomIconNames.Profile}),
          headerShown: false,
        }}
      />
    </BottomTabs.Navigator>
  );
};

export {BottomTabNavigator};
