import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import {CustomIconType} from './CustomIcon.types';
import {icomoonConfig} from '../../assets';

const IcomoonIcon = createIconSetFromIcoMoon(icomoonConfig);

export const CustomIcon = (props: CustomIconType) => {
  return <IcomoonIcon {...props} />;
};
