import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LocalizedLanguages} from '../../../../i18n';
import {PrimaryStackParams} from '../../../../navigation';

export type CategorySectionItem = {
  title: LocalizedLanguages;
  logo: string;
  alias: string;
};

export type CategorySectionProps = {
  navigation: NativeStackNavigationProp<PrimaryStackParams>;
};
