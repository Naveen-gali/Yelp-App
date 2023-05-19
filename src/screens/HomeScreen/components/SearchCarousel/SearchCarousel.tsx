import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Dots from 'react-native-dots-pagination';
import {Carousel} from '../../../../components';
import {useThemeColor} from '../../../../hooks';
import {DeviceUtils, LocaleUtils, verticalScale} from '../../../../utils';
import {
  SearchCarouselProps,
  SearchCarouselRenderItemProps,
} from './SearchCarousel.types';
import {SearchCarouselItem} from './SearchCarouselItem';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PrimaryStackParams, PrimaryStackRoute} from '../../../../navigation';

const SearchCarouselRenderItem = ({
  index,
  item,
}: SearchCarouselRenderItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<PrimaryStackParams>>();

  return (
    <SearchCarouselItem
      name={LocaleUtils.localizedText(item.name)}
      buttonText={LocaleUtils.localizedText(item.buttonText)}
      image={item.image}
      key={index}
      onPress={() =>
        navigation.navigate(PrimaryStackRoute.CategoryDetail, {
          title: LocaleUtils.localizedText(item.buttonText),
          alias: item.category,
        })
      }
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
    bottom: verticalScale(35),
    width: DeviceUtils.getDeviceWindowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {SearchCarousel};
