import Animated from 'react-native-reanimated';
import {localizedLanguagesStrings} from '../../../../i18n';

export type CarouselDataItem = {
  name: localizedLanguagesStrings;
  image: string;
  buttonText: localizedLanguagesStrings;
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
