import {StoryObj} from '@storybook/react-native';
import React from 'react';
import {Decorator} from '../../../.storybook';
import {CustomIcon} from './CustomIcon';
import {CustomIconNames} from './CustomIcon.types';

const MyCustomIconMeta = {
  title: 'MyCustomIcon',
  component: CustomIcon,
  args: {
    name: CustomIconNames.AmazonPay,
    size: 200,
  },
  decorators: [Decorator],
};

export default MyCustomIconMeta;

type DefaultCustomIconProps = Parameters<typeof CustomIcon>[0];
type Story = StoryObj<DefaultCustomIconProps>;

export const Basic = {};

export const CustomIconFromIcomoon: Story = {
  render: args => {
    const {color} = args;
    return (
      <CustomIcon
        name={args.name}
        color={color}
        size={args.size}
        style={args.style}
      />
    );
  },

  args: {
    name: CustomIconNames.Arts,
    size: 100,
  },
};

export const AllIcons: Story = {
  args: {
    name: CustomIconNames.Delivery,
    size: 200,
    color: '#000000',
  },
  argTypes: {
    name: {
      options: Object.values(CustomIconNames),
      control: {
        type: 'select',
        labels: Object.keys(CustomIconNames),
      },
    },
    size: {
      control: {type: 'number'},
    },
    color: {
      control: {type: 'color'},
    },
    style: {
      control: {
        type: 'object',
      },
    },
  },
  parameters: {
    controls: {sort: 'requiredFirst'},
  },
};
