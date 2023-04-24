import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Dots from 'react-native-dots-pagination';
import {Carousel} from '../../../../components';
import {Pallete} from '../../../../theme';
import {verticalScale, DeviceUtils} from '../../../../utils';
import {SearchCarouselItem} from './SearchCarouselItem';
import {SearchCarouselData} from '../../../../assets/data';

export const SearchCarouselRenderItem = ({index, item}: any) => {
  const locale = DeviceUtils.locale;

  return (
    <SearchCarouselItem
      name={
        item.name[locale] !== undefined ? item.name[locale] : item.name.en_US
      }
      buttonText={item.buttonText}
      image={item.image}
      key={index}
    />
  );
};

const SearchCarousel = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const width = DeviceUtils.getDeviceWidth();

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
    width: DeviceUtils.getDeviceWidth(),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {SearchCarousel};
