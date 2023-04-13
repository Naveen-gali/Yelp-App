import {DefaultTheme} from '@react-navigation/native';
import {Pallete} from './pallete';

const LightTheme = {
  dark: false,
  colors: {
    primary: Pallete.primary1,
    secondary: Pallete.secondary1,
    onPrimary: Pallete.neutral800,
    onSecondary: Pallete.neutral800,
    primaryIcons: Pallete.primary2,
    secondaryIcons: Pallete.secondary2,
    card: Pallete.neutral200,
    text: Pallete.neutral800,
    text2: Pallete.neutral100,
    background: Pallete.background,
    primaryBackground: Pallete.primaryBackground,
    secondaryBackground: Pallete.secondaryBackground,
    notification: DefaultTheme.colors.notification,
    border: DefaultTheme.colors.border,
    disabled: Pallete.neutral400,
  },
};

//TODO: Yelp Design System doesnot hold a dark mode for their apps. So find on own
const DarkTheme = {
  dark: true,
  colors: {
    primary: Pallete.primary1,
    secondary: Pallete.secondary1,
    onPrimary: Pallete.neutral800,
    onSecondary: Pallete.neutral800,
    primaryIcons: Pallete.primary2,
    secondaryIcons: Pallete.secondary2,
    card: Pallete.neutral200,
    text: Pallete.neutral800,
    text2: Pallete.neutral100,
    background: Pallete.background,
    primaryBackground: Pallete.primaryBackground,
    secondaryBackground: Pallete.secondaryBackground,
    notification: DefaultTheme.colors.notification,
    border: DefaultTheme.colors.border,
    disabled: Pallete.neutral400,
  },
};

export {LightTheme, DarkTheme};
