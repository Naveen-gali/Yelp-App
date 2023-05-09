import {
  GestureResponderEvent,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export type EventItemProps = {
  name: string;
  onPress: (event: GestureResponderEvent) => void;
  imageUrl?: string;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
};
