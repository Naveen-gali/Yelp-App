import {addDecorator} from '@storybook/react-native';
import React from 'react';
import {View} from 'react-native';

const Decorator = (Story: any) => (
  <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <Story />
  </View>
);

export {Decorator};
