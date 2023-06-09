import remoteConfig from '@react-native-firebase/remote-config';
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

  const active_color = remoteConfig().getValue('bottom_tab_active_color');

  return (
    <BottomTabs.Navigator>
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
        component={ProfileScreen}
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
