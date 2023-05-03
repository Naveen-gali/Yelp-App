import {StyleProp, ViewStyle} from 'react-native';
import {LocalizedLanguages} from '../../../../i18n';

export type CarouselDataItem = {
  name: LocalizedLanguages;
  image: string;
  buttonText: LocalizedLanguages;
  category: string;
};

export type SearchCarouselProps = {
  carouselData: CarouselDataItem[];
  style?: StyleProp<ViewStyle>;
};
