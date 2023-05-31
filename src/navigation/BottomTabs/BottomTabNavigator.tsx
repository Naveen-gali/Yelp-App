import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PrimaryStackNavigator} from '../PrimaryStack';
import {BottomTabRoute} from './BottomTabNavigator.types';
import {CustomIcon, CustomIconNames} from '../../components';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';

const BottomTabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const tabBarIcon = (props: {
    focused: boolean;
    color: string;
    size: number;
    icon: CustomIconNames;
  }) => {
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
          tabBarIcon: ({color, focused, size}) =>
            tabBarIcon({
              focused,
              color,
              size,
              icon: CustomIconNames.Search,
            }),
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name={BottomTabRoute.Me}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, focused, size}) =>
            tabBarIcon({
              color,
              focused,
              size,
              icon: CustomIconNames.Profile,
            }),
          headerShown: false,
        }}
      />
    </BottomTabs.Navigator>
  );
};

export {BottomTabNavigator};
