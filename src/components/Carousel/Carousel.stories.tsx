import React from 'react';
import {StoryObj} from '@storybook/react-native';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Decorator} from '../../../.storybook/decorators';
import {Carousel} from './Carousel';
import {CarouselProps} from './Carousel.types';
import {SearchCarouselData} from '../../assets/data';
import {SearchCarouselRenderItem} from '../../screens/HomeScreen/components';

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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2,
    renderItem: ({index, item}) => {
      return (
        <Image
          source={{uri: item.image}}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width,
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

export const SearchCarousel: Story = {
  args: {
    data: SearchCarouselData,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2,
    renderItem: ({index, item}) => {
      return (
        <View style={styles.searchCarouselContainer}>
          <SearchCarouselRenderItem item={item} index={index} />
        </View>
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
    pagingEnabled: {
      control: 'boolean',
    },
  },
};

const styles = StyleSheet.create({
  searchCarouselContainer: {
    marginTop: 200,
  },
});
