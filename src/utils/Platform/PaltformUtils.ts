import {Platform} from 'react-native';
import {PlatformType} from './PlatformUtils.types';

const isAndroid = Platform.OS === 'android';
const isIos = Platform.OS === 'ios';
const isPlatform = (T: PlatformType) => Platform.OS === T;

export {isAndroid, isIos, isPlatform};
