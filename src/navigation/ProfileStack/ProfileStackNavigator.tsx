import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  ProfileStackParams,
  ProfileStackRoute,
} from './ProfileStackNavigator.types';
import {ContactUsScreen, ProfileScreen} from '../../screens';

const ProfileStack = createNativeStackNavigator<ProfileStackParams>();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={ProfileStackRoute.Profile}
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name={ProfileStackRoute.Contact}
        component={ContactUsScreen}
      />
    </ProfileStack.Navigator>
  );
};

export {ProfileStackNavigator};
