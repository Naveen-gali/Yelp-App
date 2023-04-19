import {Dimensions} from 'react-native';

const getWidth = (dim: 'window' | 'screen') => Dimensions.get(dim).width;

const getHeight = (dim: 'window' | 'screen') => Dimensions.get(dim).height;

export {getHeight, getWidth};
