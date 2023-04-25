import Animated from 'react-native-reanimated';
import {LocalizedLanguages} from '../../../../i18n';

export type CarouselDataItem = {
  name: LocalizedLanguages;
  image: string;
  buttonText: LocalizedLanguages;
  category: string;
};

export type SearchCarouselRenderItemProps = {
  index: number;
  item: CarouselDataItem;
  animationValue: Animated.SharedValue<number>;
};

export type SearchCarouselType = {
  carouselData: CarouselDataItem[];
};
