import {
  GestureResponderEvent,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export type CategoryItemProps = {
  title: string;
  alias: string;
  iconStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: (event: GestureResponderEvent) => void;
};
