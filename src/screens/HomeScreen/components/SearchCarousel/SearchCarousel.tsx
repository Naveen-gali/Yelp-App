import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Dots from 'react-native-dots-pagination';
import {Carousel} from '../../../../components';
import {useThemeColor} from '../../../../hooks';
import {DeviceUtils, LocaleUtils, verticalScale} from '../../../../utils';
import {CarouselDataItem, SearchCarouselProps} from './SearchCarousel.types';
import {SearchCarouselItem} from './SearchCarouselItem';
import {CarouselRenderItemInfo} from 'react-native-reanimated-carousel/lib/typescript/types';

export const SearchCarouselRenderItem = ({
  index,
  item,
}: CarouselRenderItemInfo<CarouselDataItem>) => {
  return (
    <SearchCarouselItem
      name={LocaleUtils.localizedText(item.name)}
      buttonText={LocaleUtils.localizedText(item.buttonText)}
      image={item.image}
      key={index}
    />
  );
};

const SearchCarousel = (props: SearchCarouselProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const width = DeviceUtils.getDeviceWindowWidth;
  const {carouselData, style} = props;

  const {colors} = useThemeColor();

  return (
    <View style={style}>
      <Carousel
        data={carouselData}
        renderItem={SearchCarouselRenderItem}
        width={width}
        height={verticalScale(250)}
        onProgressChange={(_e, a) => setCurrentSlideIndex(Math.floor(a))}
      />
      <View style={styles.dotsContainer}>
        <Dots
          length={carouselData.length}
          active={currentSlideIndex}
          activeColor={colors.activeDots}
          passiveColor={colors.passiveDots}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dotsContainer: {
    position: 'absolute',
    bottom: verticalScale(10),
    width: DeviceUtils.getDeviceWindowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {SearchCarousel};
