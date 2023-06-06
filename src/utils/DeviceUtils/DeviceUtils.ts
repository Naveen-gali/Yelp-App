import {Dimensions, NativeModules, Platform} from 'react-native';
import {PlatformType} from './DeviceUtils.types';

const isAndroid = Platform.OS === 'android';
const isIos = Platform.OS === 'ios';
const isPlatform = (T: PlatformType) => Platform.OS === T;

const locale: string = isIos
  ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0]
  : NativeModules.I18nManager.localeIdentifier;

const getDeviceWindowWidth = Dimensions.get('window').width;
const getDeviceWindowHeight = Dimensions.get('window').height;

const getDeviceScreenWidth = Dimensions.get('screen').width;
const getDeviceScreenHeight = Dimensions.get('screen').height;

export const DeviceUtils = {
  locale,
  isIos,
  isAndroid,
  isPlatform,
  getDeviceScreenHeight,
  getDeviceScreenWidth,
  getDeviceWindowHeight,
  getDeviceWindowWidth,
};
