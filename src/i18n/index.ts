import LocalizedStrings from 'react-native-localization';
import * as en from './en.json';
import * as ar from './ar.json';

export const Strings = new LocalizedStrings<typeof en>({
  'en-US': en,
  ar: ar,
});

export * from './i18n.types';
