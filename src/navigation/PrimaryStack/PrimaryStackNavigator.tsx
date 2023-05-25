import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useThemeColor} from '../../hooks';
import {
  CategoryBusinessesScreen,
  CategoryDetailScreen,
  HomeScreen,
} from '../../screens';
import {
  PrimaryStackParams,
  PrimaryStackRoute,
} from './PrimaryStackNavigator.types';
import {FeaturedCategories} from '../../utils';

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
        name={PrimaryStackRoute.CategoryDetail}
        component={CategoryDetailScreen}
        options={({route}) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor:
              route.params.alias === FeaturedCategories.more
                ? colors.primary
                : undefined,
          },
          headerTintColor:
            route.params.alias === FeaturedCategories.more
              ? colors.background
              : undefined,
        })}
      />
      <PrimaryStack.Screen
        name={PrimaryStackRoute.CategoryBusinesses}
        component={CategoryBusinessesScreen}
        options={({route}) => ({
          title: route.params.category.title,
        })}
      />
    </PrimaryStack.Navigator>
  );
};

export {PrimaryStackNavigator};
