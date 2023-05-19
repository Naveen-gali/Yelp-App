import {StoryObj} from '@storybook/react-native';
import {Decorator} from '../../../.storybook';
import {FeaturedCategories} from '../../utils';
import {CategoryItem as CategoryItemComp} from './CategoryItem';
import {CategoryItemProps} from './CategoryItem.types';

const MyCategoryItem = {
  title: 'CategoryItem',
  component: CategoryItemComp,
  decorators: [Decorator],
};

export default MyCategoryItem;

type Story = StoryObj<CategoryItemProps>;

export const CategoryItem: Story = {
  args: {
    title: 'Restaurants',
    alias: 'restaurants',
  },
  argTypes: {
    alias: {
      options: Object.values(FeaturedCategories),
      control: {
        type: 'select',
      },
    },
    iconStyle: {
      control: {
        type: 'object',
      },
    },
    textStyle: {
      control: {
        type: 'object',
      },
    },
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
