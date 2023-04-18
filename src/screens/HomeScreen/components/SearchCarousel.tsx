import React, {useState} from 'react';
import {Carousel} from '../../../components';
import CustomData from '../../../assets/data/CarouselData.json';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {scale, verticalScale} from '../../../utils';
import Dots from 'react-native-dots-pagination';
import {CarouselDataItem} from './CarouselDataItem/CarouselDataItem';
import {Pallete} from '../../../theme';

const SearchCarousel = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const width = Dimensions.get('window').width;

  const renderItem = ({index, item}: any) => (
    <View style={styles.renderItem} key={index}>
      <Image
        source={{uri: item.image}}
        style={styles.image}
        resizeMode="stretch"
      />
      <CarouselDataItem name={item.name} buttonText={item.buttonText} />
    </View>
  );
  return (
    <View>
      <Carousel
        data={CustomData}
        renderItem={renderItem}
        width={scale(width)}
        height={verticalScale(250)}
        pagingEnabled
        scrollAnimationDuration={1000}
        autoPlay={true}
        onProgressChange={(_e, a) => setCurrentSlideIndex(Math.floor(a))}
      />
      <View style={styles.dotsContainer}>
        <Dots
          length={CustomData.length}
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
