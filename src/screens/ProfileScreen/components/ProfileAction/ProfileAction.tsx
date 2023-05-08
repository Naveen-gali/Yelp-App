import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomIcon, CustomIconNames} from '../../../../components';
import {useThemeColor} from '../../../../hooks';
import {ProfileActionProps} from './ProfileAction.types';
import {verticalScale} from '../../../../utils';

const ProfileAction = (props: ProfileActionProps) => {
  const {icon} = props;

  const {colors} = useThemeColor();

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: colors.passiveDots}]}>
      <CustomIcon name={CustomIconNames[icon]} size={verticalScale(20)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    // TODO: Ask About this
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileAction;
