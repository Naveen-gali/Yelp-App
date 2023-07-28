import remoteConfig from '@react-native-firebase/remote-config';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {CustomIcon, CustomIconNames} from '../../components';
import {PrimaryStackNavigator} from '../PrimaryStack';
import {
  BottomTabBarIconProps,
  BottomTabRoute,
} from './BottomTabNavigator.types';
import {ProfileStackNavigator} from '../ProfileStack';

const BottomTabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const tabBarIcon = (props: BottomTabBarIconProps) => {
    return (
      <CustomIcon name={props.icon} size={props.size} color={props.color} />
    );
  };

  const active_color = remoteConfig().getValue('bottom_tab_active_color');

  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}>
      <BottomTabs.Screen
        name={BottomTabRoute.Search}
        component={PrimaryStackNavigator}
        options={{
          tabBarIcon: props =>
            tabBarIcon({
              ...props,
              icon: CustomIconNames.Search,
              color: props.focused ? active_color.asString() : props.color,
            }),
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name={BottomTabRoute.Me}
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: props =>
            tabBarIcon({
              ...props,
              icon: CustomIconNames.Profile,
              color: props.focused ? active_color.asString() : '',
            }),
          headerShown: false,
        }}
      />
    </BottomTabs.Navigator>
  );
};

export {BottomTabNavigator};
