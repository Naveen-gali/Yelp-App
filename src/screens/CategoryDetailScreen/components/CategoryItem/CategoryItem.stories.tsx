import {StoryObj} from '@storybook/react-native';
import {Decorator} from '../../../../../.storybook';
import {CategoryItem} from './CategoryItem';
import {CategoryItemProps} from './CategoryItem.types';

const MyCategoryItem = {
  title: 'CategoryItem',
  component: CategoryItem,
  decorators: [Decorator],
};

export default MyCategoryItem;

type Story = StoryObj<CategoryItemProps>;

export const CustomCategoryItem: Story = {
  args: {
    title: 'Food',
    alias: 'food',
    showArrow: true,
    showIcon: true,
    style: {
      marginVertical: 2,
      marginHorizontal: 6,
      paddingVertical: 8,
    },
    iconStyle: {
      marginRight: 10,
    },
  },
  argTypes: {
    showArrow: {
      type: 'boolean',
    },
    showIcon: {
      type: 'boolean',
    },
    style: {
      control: {
        type: 'object',
      },
    },
    arrowStyle: {
      control: {
        type: 'object',
      },
    },
    iconStyle: {
      control: {
        type: 'object',
      },
    },
    labelStyle: {
      control: {
        type: 'object',
      },
    },
    onPress: {
      action: 'onPress',
    },
  },
};
