import {DefaultTheme} from '@react-navigation/native';
import {Palette} from './palette';

const LightTheme = {
  dark: false,
  colors: {
    primary: Palette.primary1,
    secondary: Palette.secondary1,
    onPrimary: Palette.neutral800,
    onSecondary: Palette.neutral800,
    primaryIcons: Palette.primary2,
    secondaryIcons: Palette.secondary2,
    card: Palette.neutral100,
    text: Palette.neutral800,
    text2: Palette.neutral100,
    background: Palette.background,
    primaryBackground: Palette.primaryBackground,
    secondaryBackground: Palette.secondaryBackground,
    notification: DefaultTheme.colors.notification,
    border: DefaultTheme.colors.border,
    disabled: Palette.neutral400,
    transparent: Palette.transparent,
    loader: Palette.neutral100,
    activeDots: Palette.neutral200,
    passiveDots: Palette.neutral500,
    loaderBackground: Palette.neutral300,
    buttonBorder: Palette.neutral900,
    placeholder: Palette.neutral700,
    shadow: Palette.neutral900,
    error: Palette.error,
  },
};

//TODO: Yelp Design System doesnot hold a dark mode for their apps. So find on own
const DarkTheme = {
  dark: true,
  colors: {
    primary: Palette.primary1,
    secondary: Palette.secondary1,
    onPrimary: Palette.neutral800,
    onSecondary: Palette.neutral800,
    primaryIcons: Palette.primary2,
    secondaryIcons: Palette.secondary2,
    card: Palette.neutral100,
    text: Palette.neutral800,
    text2: Palette.neutral100,
    background: Palette.background,
    primaryBackground: Palette.primaryBackground,
    secondaryBackground: Palette.secondaryBackground,
    notification: DefaultTheme.colors.notification,
    border: DefaultTheme.colors.border,
    disabled: Palette.neutral400,
    transparent: Palette.transparent,
    loader: Palette.neutral100,
    activeDots: Palette.neutral200,
    passiveDots: Palette.neutral500,
    loaderBackground: Palette.neutral300,
    buttonBorder: Palette.neutral900,
    placeholder: Palette.neutral700,
    shadow: Palette.neutral900,
    error: Palette.error,
  },
};

export {LightTheme, DarkTheme};
