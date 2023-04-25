import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Dots from 'react-native-dots-pagination';
import {Carousel} from '../../../../components';
import {useThemeColor} from '../../../../hooks';
import {DeviceUtils, ItemLocaleUtils, verticalScale} from '../../../../utils';
import {
  SearchCarouselRenderItemProps,
  SearchCarouselType,
} from './SearchCarousel.types';
import {SearchCarouselItem} from './SearchCarouselItem';

export const SearchCarouselRenderItem = ({
  index,
  item,
}: SearchCarouselRenderItemProps) => {
  return (
    <SearchCarouselItem
      name={ItemLocaleUtils.localizedName(item)}
      buttonText={ItemLocaleUtils.localizedButtonText(item)}
      image={item.image}
      key={index}
    />
  );
};

const SearchCarousel = (props: SearchCarouselType) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const width = DeviceUtils.getDeviceWindowWidth;
  const {carouselData} = props;

  const {colors} = useThemeColor();

  return (
    <>
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
    </>
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
