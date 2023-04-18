import React, {useState} from 'react';
import {Carousel} from '../../../components';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {verticalScale} from '../../../utils';
import Dots from 'react-native-dots-pagination';
import {CarouselDataItem} from './CarouselDataItem/CarouselDataItem';
import {Pallete} from '../../../theme';
import {SearchCarouselData} from '../../../assets/data';

export const SearchCarouselRenderItem = ({index, item}: any) => (
  <View style={styles.renderItem} key={index}>
    <Image
      source={{uri: item.image}}
      style={styles.image}
      resizeMode="stretch"
    />
    <CarouselDataItem name={item.name} buttonText={item.buttonText} />
  </View>
);

const SearchCarousel = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const width = Dimensions.get('window').width;

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
  renderItem: {flex: 1, justifyContent: 'center'},
  image: {
    width: Dimensions.get('window').width,
    height: verticalScale(250),
  },
  dotsContainer: {
    position: 'absolute',
    bottom: verticalScale(10),
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {SearchCarousel};
