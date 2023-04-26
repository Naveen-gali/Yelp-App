import React from 'react';
import RNCarousel from 'react-native-reanimated-carousel';
import {CarouselProps} from './Carousel.types';
import {StyleSheet} from 'react-native';

const Carousel = (props: CarouselProps) => {
  const {style, ...restProps} = props;
  return <RNCarousel style={[styles.carousel, style]} {...restProps} />;
};

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
  },
});

export {Carousel};
