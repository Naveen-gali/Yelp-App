import {ImageStyle, StyleProp, ViewStyle} from 'react-native';
import {LocalizedLanguages} from '../../i18n';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PrimaryStackParams} from '../../navigation';

export type CategoryItemProps = {
  title: LocalizedLanguages;
  icon: string;
  iconStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  navigation: NativeStackNavigationProp<PrimaryStackParams>;
  alias: string;
};
