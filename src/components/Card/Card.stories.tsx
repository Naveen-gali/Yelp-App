import React from 'react';
import {StoryObj} from '@storybook/react-native';
import {Decorator} from '../../../.storybook/decorators';
import {Card} from './Card';
import {CardProps} from './Card.types';
import {StyleSheet, Text} from 'react-native';

const MyCard = {
  title: 'Card',
  component: Card,
  decorators: [Decorator],
};

export default MyCard;

type Story = StoryObj<CardProps>;

export const CustomCard: Story = {
  render: args => (
    <Card style={[styles.container, args.style]} onPress={args.onPress}>
      <Text>Children goes here</Text>
    </Card>
  ),
  argTypes: {
    style: {
      control: {
        type: 'object',
      },
    },
    onPress: {
      action: 'onPress',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'red',
  },
});
