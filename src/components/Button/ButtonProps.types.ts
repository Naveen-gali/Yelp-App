import {
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';

export type ButtonIconProps = {
  icon?: string;
  iconRight?: boolean;
  iconStyle?: StyleProp<TextStyle>;
};

export type ButtonProps = Omit<TouchableOpacityProps, 'onPress'> &
  ButtonIconProps & {
    mode: 'text' | 'outlined' | 'default';
    isLoading?: boolean;
    textStyle?: StyleProp<TextStyle>;
    onPress: (event: GestureResponderEvent) => void;
    loaderColor?: ColorValue;
  };
