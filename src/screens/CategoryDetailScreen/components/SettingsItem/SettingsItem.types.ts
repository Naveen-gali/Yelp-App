import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type SettingsItemProps = {
  title: string;
  alias: string;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  arrowStyle?: StyleProp<TextStyle>;
};
