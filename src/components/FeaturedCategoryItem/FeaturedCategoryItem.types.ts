import {
  GestureResponderEvent,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {FeaturedCategories} from '../../utils';

export type FeaturedCategoryItemProps = {
  title: string;
  alias: FeaturedCategories;
  iconStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: (event: GestureResponderEvent) => void;
};
