import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ProfileStackParams,
  ProfileStackRoute,
} from '../../navigation/ProfileStack';

export type ContactUsScreenProps = NativeStackScreenProps<
  ProfileStackParams,
  ProfileStackRoute.Contact
>;

export type ContactUsInputs = {
  name: string;
  age: string;
  email: string;
  phone_number: string;
  query: string;
  date: string;
  country_code: string;
  country_locale: string;
};

export enum ContactUsInputTypes {
  textInput = 'TextInput',
  datePicker = 'DatePicker',
  countryCodePicker = 'CountryCodePicker',
}
