import {StoryObj} from '@storybook/react-native';
import {Dimensions, Image} from 'react-native';
import {Decorator} from '../../../.storybook/decorators';
import {Carousel} from './Carousel';
import {CarouselProps} from './Carousel.types';
import {CarouselData} from '../../assets/data';

const MyCarousel = {
  title: 'Carousel',
  component: Carousel,
  decorators: [Decorator],
};

export default MyCarousel;

type Story = StoryObj<CarouselProps>;

//TODO: Change Name
export const CarouselStory: Story = {
  args: {
    // TODO: Search Carouse Data naming.
    data: CarouselData,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2,
    renderItem: ({index, item}) => {
      return <Image source={{uri: item.image}} />;
    },
  },
  argTypes: {
    autoPlay: {
      control: 'boolean',
    },
  },
};
