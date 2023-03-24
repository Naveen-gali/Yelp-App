import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import {CustomIconType} from './CustomIconTypes';
import {icomoonConfig} from '../../assets';

const IcomoonIcon = createIconSetFromIcoMoon(icomoonConfig);

export const CustomIcon = (props: CustomIconType) => {
  return <IcomoonIcon {...props} />;
};
