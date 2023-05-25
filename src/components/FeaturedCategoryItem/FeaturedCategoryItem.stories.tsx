import {StoryObj} from '@storybook/react-native';
import {Decorator} from '../../../.storybook';
import {FeaturedCategories} from '../../utils';
import {FeaturedCategoryItem as FeaturedCategoryItemComp} from './FeaturedCategoryItem';
import {FeaturedCategoryItemProps} from './FeaturedCategoryItem.types';

const MyCategoryItem = {
  title: 'FeaturedCategoryItem',
  component: FeaturedCategoryItemComp,
  decorators: [Decorator],
};

export default MyCategoryItem;

type Story = StoryObj<FeaturedCategoryItemProps>;

export const FeaturedCategoryItem: Story = {
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
