import {addDecorator} from '@storybook/react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Decorator = (Story: any) => (
  <View style={styles.decoratorStyle}>
    <Story />
  </View>
);

const styles = StyleSheet.create({
  decoratorStyle: {alignItems: 'center', justifyContent: 'center', flex: 1},
});

export {Decorator};
