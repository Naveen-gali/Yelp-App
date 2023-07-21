import {Country} from 'react-native-country-picker-modal';
import {
  FlatListProps,
  ModalProps,
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  ViewStyle,
} from 'react-native';
import {
  CountryCode,
  Region,
  Subregion,
  TranslationLanguageCode,
} from 'react-native-country-picker-modal/lib/types';
import {Theme} from 'react-native-country-picker-modal/lib/CountryTheme';
import {CountryFilterProps} from 'react-native-country-picker-modal/lib/CountryFilter';
import {FlagButtonProps} from 'react-native-country-picker-modal/lib/FlagButton';
import {ReactNode} from 'react';
import {TextInputProps} from '../TextInput.types';
import {FieldError} from 'react-hook-form';

export type CountryPickerProps = {
  onSelect: (country: Country) => void;
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value: string | undefined;
  style: StyleProp<ViewStyle>;
  region?: Region;
  subregion?: Subregion;
  countryCodes?: CountryCode[];
  excludeCountries?: CountryCode[];
  preferredCountries?: CountryCode[];
  theme?: Theme;
  translation?: TranslationLanguageCode;
  modalProps?: ModalProps;
  filterProps?: CountryFilterProps;
  flatListProps?: FlatListProps<Country>;
  withAlphaFilter?: boolean;
  withCallingCode?: boolean;
  withCurrency?: boolean;
  withEmoji?: boolean;
  withCountryNameButton?: boolean;
  withCurrencyButton?: boolean;
  withCallingCodeButton?: boolean;
  withCloseButton?: boolean;
  withFlagButton?: boolean;
  withFilter?: boolean;
  withFlag?: boolean;
  withModal?: boolean;
  disableNativeModal?: boolean;
  visible?: boolean;
  containerButtonStyle?: StyleProp<ViewStyle>;
  renderFlagButton?(props: FlagButtonProps): ReactNode;
  renderCountryFilter?(props: CountryFilterProps): ReactNode;
  onOpen?(): void;
  onClose(): void;
  label: string;
  textInputProps?: Omit<
    TextInputProps,
    'onChangeText' | 'error' | 'errorMessage'
  >;
  error?: FieldError;
  errorMessage?: string;
};
