import {ImageStyle, StyleProp, ViewStyle} from 'react-native';
import {LocalizedLanguages} from '../../i18n';

export type CategoryItemProps = {
  title: LocalizedLanguages;
  icon: string;
  iconStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
};
