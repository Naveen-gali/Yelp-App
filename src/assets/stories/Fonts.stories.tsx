import {StoryObj} from '@storybook/react-native';
import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {PrimaryFonts, SecondaryFonts} from '..';
import {Decorator} from '../../../.storybook';

const FontsMeta = {
  title: 'Fonts',
  decorator: [Decorator],
};

export default FontsMeta;

type Story = StoryObj<
  TextStyle & {
    text: string;
  }
>;

export const UsingPrimaryFonts: Story = {
  render: args => (
    <Text
      style={[
        styles.fontText,
        {
          fontFamily: args.fontFamily,
        },
      ]}>
      {args.text}
    </Text>
  ),
  args: {
    fontFamily: PrimaryFonts.Bold,
    text: 'Helllo  World',
  },
  argTypes: {
    fontFamily: {
      options: Object.values(PrimaryFonts),
      control: {type: 'select'},
    },
    text: {
      control: {type: 'text'},
    },
  },
};

export const UsingSecondaryFonts: Story = {
  render: args => (
    <Text
      style={[
        styles.fontText,
        {
          fontFamily: args.fontFamily,
        },
      ]}>
      {args.text}
    </Text>
  ),
  args: {
    fontFamily: SecondaryFonts.Regular,
    text: 'Helllo  World',
  },
  argTypes: {
    fontFamily: {
      options: Object.values(SecondaryFonts),
      control: {type: 'select'},
    },
    text: {
      control: {type: 'text'},
    },
  },
};

const styles = StyleSheet.create({
  fontText: {
    fontSize: 30,
  },
});
