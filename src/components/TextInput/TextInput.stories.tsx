import {StoryObj} from '@storybook/react-native';
import {Decorator} from '../../../.storybook';
import {TextInput} from './TextInput';
import {TextInputProps} from './TextInput.types';

const MyTextInput = {
  title: 'TextInput',
  component: TextInput,
  decorators: [Decorator],
};

export default MyTextInput;

type Story = StoryObj<TextInputProps>;

export const CustomTextInput: Story = {
  args: {
    mode: 'default',
    label: 'Label',
    style: {width: 360},
    editable: true,
  },
  argTypes: {
    mode: {
      options: ['default', 'outline', 'border-less'],
      control: {
        type: 'select',
      },
    },
    editable: {
      type: 'boolean',
    },
    multiline: {
      type: 'boolean',
    },
    style: {
      control: {
        type: 'object',
      },
    },
    error: {
      type: 'boolean',
    },
    errorMessage: {
      type: 'string',
      if: {arg: 'error', truthy: true},
    },
    errorMessageStyle: {
      control: {
        type: 'object',
      },
    },
    hint: {
      type: 'string',
    },
    left: {
      type: 'string',
    },
    right: {
      type: 'string',
    },
    hintStyle: {
      control: {
        type: 'object',
      },
    },
    inputStyle: {
      control: {
        type: 'object',
      },
    },
    labelStyle: {
      control: {
        type: 'object',
      },
    },
    onChangeText: {
      action: 'onChangeText',
    },
    onEndEditing: {
      action: 'onEndEditing',
    },
    onFocus: {
      action: 'onFocus',
    },
    onBlur: {
      action: 'onBlur',
    },
  },
};
