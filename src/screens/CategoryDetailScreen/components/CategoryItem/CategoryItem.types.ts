import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export type CategoryItemProps = {
  title: string;
  alias: string;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  arrowStyle?: StyleProp<TextStyle>;
  onPress: (event: GestureResponderEvent) => void;
  showIcon: boolean;
  showArrow: boolean;
};
