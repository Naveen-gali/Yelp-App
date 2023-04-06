import React from 'react';
import {SVGS} from '..';
import {StoryObj} from '@storybook/react-native';
import {SvgProps} from 'react-native-svg';
import {Decorator} from '../../../.storybook/decorators';

const SvgWrapper = (props: {name: keyof typeof SVGS} & SvgProps) => {
  const {name, ...restProps} = props;
  const Component = SVGS[name];

  return <Component {...restProps} />;
};

const SvgIconsMeta = {
  title: 'Svgs',
  component: SvgWrapper,
  decorators: [Decorator],
};

export default SvgIconsMeta;

type Story = StoryObj<
  SvgProps & {
    name: keyof typeof SVGS;
  }
>;

export const AllSvgs: Story = {
  args: {
    name: 'Logo',
    width: 200,
    height: 200,
  },
  argTypes: {
    name: {
      options: Object.keys(SVGS),
      control: {
        type: 'select',
      },
    },
  },
};
