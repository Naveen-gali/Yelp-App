import {StoryObj} from '@storybook/react-native';
import React from 'react';
import {Image} from 'react-native';
import {Decorator} from '../../../.storybook';
import {SearchCarouselData} from '../../assets/data';
import {DeviceUtils} from '../../utils';
import {Carousel} from './Carousel';
import {CarouselProps} from './Carousel.types';

const MyCarousel = {
  title: 'Carousel',
  component: Carousel,
  decorators: [Decorator],
};

export default MyCarousel;

type Story = StoryObj<CarouselProps>;

export const DefaultCarousel: Story = {
  args: {
    data: SearchCarouselData,
    width: DeviceUtils.getDeviceWindowWidth,
    height: DeviceUtils.getDeviceWindowWidth / 2,
    renderItem: ({index, item}) => {
      return (
        <Image
          source={{uri: item.image}}
          style={{
            width: DeviceUtils.getDeviceWindowWidth,
            height: DeviceUtils.getDeviceWindowWidth,
          }}
          key={index}
        />
      );
    },
  },
  argTypes: {
    autoPlay: {
      control: 'boolean',
    },
    scrollAnimationDuration: {
      control: 'number',
    },
    loop: {
      control: 'boolean',
    },
  },
};
