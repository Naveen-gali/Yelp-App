import {Dimensions, NativeModules, Platform} from 'react-native';
import {PlatformType} from './DeviceUtils.types';

const isAndroid = Platform.OS === 'android';
const isIos = Platform.OS === 'ios';
const isPlatform = (T: PlatformType) => Platform.OS === T;

const locale = isIos
  ? NativeModules.SettingsManager.settings.AppleLocale
  : NativeModules.I18nManager.localeIdentifier;

const getDeviceWidth = (dim: 'window' | 'screen' = 'window') =>
  Dimensions.get(dim).width;

const getDeviceHeight = (dim: 'window' | 'screen' = 'window') =>
  Dimensions.get(dim).height;

export const DeviceUtils = {
  locale,
  isIos,
  isAndroid,
  isPlatform,
  getDeviceHeight,
  getDeviceWidth,
};
