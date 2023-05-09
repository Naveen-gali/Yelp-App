import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {CustomIcon} from '../../../../components';
import {useThemeColor} from '../../../../hooks';
import {verticalScale} from '../../../../utils';
import {ProfileActionsDataItemType} from '../../../../assets';

const ProfileAction = (props: ProfileActionsDataItemType) => {
  const {icon} = props;
  const {colors} = useThemeColor();

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: colors.passiveDots}]}>
      <CustomIcon name={icon} size={verticalScale(20)} />
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
