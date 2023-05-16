import {StoryObj} from '@storybook/react-native';
import {Decorator} from '../../../.storybook';
import {CustomIconNames} from '../CustomIcon';
import {Button} from './Button';
import type {ButtonProps} from './Button.types';

const MyButton = {
  title: 'Button',
  component: Button,
  decorators: [Decorator],
};

export default MyButton;

type Story = StoryObj<ButtonProps>;

export const CustomButton: Story = {
  args: {
    children: 'Text Here',
    mode: 'default',
    icon: CustomIconNames.Search,
    style: {padding: 10, flex: 0, marginHorizontal: 40, paddingHorizontal: 30},
  },
  argTypes: {
    children: {
      label: 'Text',
      control: {
        type: 'text',
      },
    },
    onPress: {
      action: 'onPress',
    },
    onLongPress: {
      action: 'onLongPress',
    },
    loaderColor: {
      control: {
        type: 'color',
      },
    },
    mode: {
      options: ['default', 'outlined', 'text'],
      control: {
        type: 'select',
      },
    },
    textStyle: {
      control: {
        type: 'object',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    iconRight: {
      control: {
        type: 'boolean',
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
    icon: {
      options: Object.values(CustomIconNames),
      control: {
        type: 'select',
      },
    },
  },
};
