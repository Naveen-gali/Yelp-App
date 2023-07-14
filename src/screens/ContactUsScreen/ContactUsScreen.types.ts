import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ProfileStackParams,
  ProfileStackRoute,
} from '../../navigation/ProfileStack';

export type ContactUsScreenProps = NativeStackScreenProps<
  ProfileStackParams,
  ProfileStackRoute.Contact
>;
