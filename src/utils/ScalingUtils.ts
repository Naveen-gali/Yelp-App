import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

const testDeviceWidth = 390;
const testDeviceHeight = 680;

const scale = (size: number) => (shortDimension / testDeviceWidth) * size;

const verticalScale = (size: number) =>
  (longDimension / testDeviceHeight) * size;

export {scale, verticalScale};
