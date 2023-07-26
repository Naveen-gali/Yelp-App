import {
  StyleProp,
  TextInputProps as DefaultProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

export type InputErrorProps = {
  error?: boolean;
  errorMessage?: string;
  errorMessageStyle?: StyleProp<TextStyle>;
};

export type TextInputProps = Omit<DefaultProps, 'onChangeText' | 'style'> &
  InputErrorProps & {
    mode?: 'default' | 'outline' | 'border-less';
    onChangeText: (text: string) => void;
    hint?: string;
    hintStyle?: StyleProp<TextStyle>;
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    right?: JSX.Element;
    left?: JSX.Element;
    inputStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
  };
