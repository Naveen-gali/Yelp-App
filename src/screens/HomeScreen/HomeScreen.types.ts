import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrimaryStackParams, PrimaryStackRoute} from '../../navigation';

export type HomeScreenProps = NativeStackScreenProps<
  PrimaryStackParams,
  PrimaryStackRoute.Home
>;
