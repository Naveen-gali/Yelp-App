import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen, CategoryDetailScreen} from '../../screens';
import {
  PrimaryStackParams,
  PrimaryStackRoute,
} from './PrimaryStackNavigator.types';
import {useThemeColor} from '../../hooks';

const PrimaryStack = createNativeStackNavigator<PrimaryStackParams>();

const PrimaryStackNavigator = () => {
  const {colors} = useThemeColor();

  return (
    <PrimaryStack.Navigator>
      <PrimaryStack.Screen
        name={PrimaryStackRoute.Home}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <PrimaryStack.Screen
        name={PrimaryStackRoute.CategoryDetailScreen}
        component={CategoryDetailScreen}
        options={({route}) => ({
          title: route.params.title,
          headerTintColor:
            route.params.alias === 'more' ? colors.primary : undefined,
        })}
      />
    </PrimaryStack.Navigator>
  );
};

export {PrimaryStackNavigator};
