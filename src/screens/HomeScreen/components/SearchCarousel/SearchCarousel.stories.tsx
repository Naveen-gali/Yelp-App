import {StoryObj} from '@storybook/react-native';
import {Decorator} from '../../../../../.storybook';
import {SearchCarousel} from './SearchCarousel';

const SearchCarouselStory = {
  title: 'Search Carousel',
  component: SearchCarousel,
  decorators: [Decorator],
};

export default SearchCarouselStory;

type Story = StoryObj<typeof SearchCarousel>;

export const SearchCarousel1: Story = {
  name: 'SearchCarousel',
};
