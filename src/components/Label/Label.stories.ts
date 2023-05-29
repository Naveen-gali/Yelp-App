import {StoryObj} from '@storybook/react-native';
import {Decorator} from '../../../.storybook';
import {Label as LabelComp} from './Label';
import {LabelProps} from './Label.types';

const MyLabelMeta = {
  title: 'Label',
  component: LabelComp,
  decorators: [Decorator],
};

export default MyLabelMeta;

type Story = StoryObj<LabelProps>;

export const Label: Story = {
  args: {
    label: 'Label Title Goes Here',
    style: {},
  },
  argTypes: {
    label: {
      type: 'string',
    },
    style: {
      control: {
        type: 'object',
      },
    },
  },
};
