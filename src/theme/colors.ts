import {DefaultTheme} from '@react-navigation/native';
import {Pallete} from './pallete';

//FIXME: Light Theming does not look accurate and need to fix
const LightTheme = {
  dark: false,
  colors: {
    primary: Pallete.primary1,
    secondary: Pallete.secondary1,
    onPrimary: Pallete.neutral,
    onSecondary: Pallete.neutral,
    primaryBorder1: Pallete.primary2,
    primaryBorder2: Pallete.primary3,
    secondaryBorder1: Pallete.secondary2,
    secondaryBorder2: Pallete.secondary3,
    card: Pallete.card,
    text: Pallete.neutral,
    text2: Pallete.neutralBlack,
    background: Pallete.background,
    notification: DefaultTheme.colors.notification,
    border: DefaultTheme.colors.border,
  },
};

//TODO: Dark Theming needs to be fixed.
const DarkTheme = {
  dark: true,
  colors: {
    primary: Pallete.primary1,
    secondary: Pallete.secondary1,
    onPrimary: Pallete.neutral,
    onSecondary: Pallete.neutral,
    primaryBorder1: Pallete.primary2,
    primaryBorder2: Pallete.primary3,
    secondaryBorder1: Pallete.secondary2,
    secondaryBorder2: Pallete.secondary3,
    card: Pallete.card,
    text: Pallete.neutral,
    text2: Pallete.neutralBlack,
    background: Pallete.background,
    notification: DefaultTheme.colors.notification,
    border: DefaultTheme.colors.border,
  },
};

export {LightTheme, DarkTheme};
