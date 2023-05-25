import {StoryObj} from '@storybook/react-native';
import {ReactNavigationDecorator} from '../../../../../.storybook/decorators';
import {CategorySection} from './CategorySection';
import {CategorySectionProps} from './CategorySection.types';

const MyCategorySection = {
  title: 'CategorySection',
  component: CategorySection,
  decorators: [ReactNavigationDecorator],
};

export default MyCategorySection;

type Story = StoryObj<CategorySectionProps>;

export const CategorySectionStory: Story = {
  args: {
    categories: [
      {
        title: 'Active',
        alias: 'active',
        parent_aliases: [],
        country_blacklist: [],
        country_whitelist: [],
      },
      {
        title: 'Night Life',
        alias: 'nightlife',
        parent_aliases: [],
        country_blacklist: [],
        country_whitelist: [],
      },
      {
        title: 'Restaurants',
        alias: 'restaurants',
        parent_aliases: [],
        country_blacklist: [],
        country_whitelist: [],
      },
      {
        title: 'Beauty & Spas',
        alias: 'beautysvc',
        parent_aliases: [],
        country_blacklist: [],
        country_whitelist: [],
      },
      {
        title: 'Shopping',
        alias: 'shopping',
        parent_aliases: [],
        country_blacklist: [],
        country_whitelist: [],
      },
      {
        title: 'HomeServices',
        alias: 'homeservices',
        parent_aliases: [],
        country_blacklist: [],
        country_whitelist: [],
      },
      {
        title: 'Plumbers',
        alias: 'plumbers',
        parent_aliases: [],
        country_blacklist: [],
        country_whitelist: [],
      },
      {
        title: 'More',
        alias: 'more',
        parent_aliases: [],
        country_blacklist: [],
        country_whitelist: [],
      },
    ],
  },
};
