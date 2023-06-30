import {ImageStyle, StyleProp, TextStyle, ViewStyle} from 'react-native';

export type ErrorViewProps = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text: string;
  action?: () => void;
  image?: string;
  imageStyle?: StyleProp<ImageStyle>;
};
