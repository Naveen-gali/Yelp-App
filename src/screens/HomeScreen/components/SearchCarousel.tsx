import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Dots from 'react-native-dots-pagination';
import {SearchCarouselData} from '../../../assets/data';
import {Carousel} from '../../../components';
import {Pallete} from '../../../theme';
import {getWidth, verticalScale} from '../../../utils';
import {SearchCarouselItem} from './SearchCarouselItem';

export const SearchCarouselRenderItem = ({index, item}: any) => (
  <SearchCarouselItem
    name={item.name}
    buttonText={item.buttonText}
    image={item.image}
    key={index}
  />
);

const SearchCarousel = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const width = getWidth('window');

  return (
    <View>
      <Carousel
        data={SearchCarouselData}
        renderItem={SearchCarouselRenderItem}
        width={width}
        height={verticalScale(250)}
        onProgressChange={(_e, a) => setCurrentSlideIndex(Math.floor(a))}
      />
      <View style={styles.dotsContainer}>
        <Dots
          length={SearchCarouselData.length}
          active={currentSlideIndex}
          activeColor={Pallete.neutral200}
          passiveColor={Pallete.neutral500}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dotsContainer: {
    position: 'absolute',
    bottom: verticalScale(10),
    width: getWidth('window'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {SearchCarousel};
