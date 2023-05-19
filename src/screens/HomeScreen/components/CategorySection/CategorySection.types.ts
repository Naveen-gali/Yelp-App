import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CategoryInterface} from '../../../../models';
import {PrimaryStackParams} from '../../../../navigation';

export type CategorySectionItem = CategoryInterface;

export type CategorySectionProps = {
  categories: CategoryInterface[];
  navigation: NativeStackNavigationProp<PrimaryStackParams>;
};
