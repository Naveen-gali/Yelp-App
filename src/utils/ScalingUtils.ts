import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const [usableWidth, usableHeight] =
  width < height ? [width, height] : [height, width];

const baseWidth = 390;
const baseHeight = 680;

const horizontalScale = (size: number) => (usableWidth / baseWidth) * size;

const verticalScale = (size: number) => (usableHeight / baseHeight) * size;

export {horizontalScale, verticalScale};
