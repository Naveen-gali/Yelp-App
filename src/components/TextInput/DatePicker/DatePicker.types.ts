import {ReactNativeModalDateTimePickerProps} from 'react-native-modal-datetime-picker';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  ViewStyle,
} from 'react-native';

export type DatePickerProps = {
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  date: Date;
  mode: 'date' | 'time' | 'datetime';
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value: string | undefined;
  style: StyleProp<ViewStyle>;
} & Omit<ReactNativeModalDateTimePickerProps, 'date' | 'isVisible' | 'mode'>;
