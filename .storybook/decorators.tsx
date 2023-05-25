import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {addDecorator} from '@storybook/react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Decorator = (Story: any) => (
  <View style={styles.decoratorStyle}>
    <Story />
  </View>
);

const Stack = createNativeStackNavigator();

const ReactNavigationDecorator = (story: any) => {
  const Screen = () => story();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MyStorybookScreen"
          component={Screen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  decoratorStyle: {alignItems: 'center', justifyContent: 'center', flex: 1},
});

export {Decorator, ReactNavigationDecorator};
