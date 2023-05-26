import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {MoreCategories} from '../../../../utils';

export type CategoryItemProps = {
  title: string;
  alias: MoreCategories;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  arrowStyle?: StyleProp<TextStyle>;
  onPress: (event: GestureResponderEvent) => void;
  showIcon: boolean;
  showArrow: boolean;
};
