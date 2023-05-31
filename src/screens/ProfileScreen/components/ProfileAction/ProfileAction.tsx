import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {CustomIcon} from '../../../../components';
import {useThemeColor} from '../../../../hooks';
import {horizontalScale, verticalScale} from '../../../../utils';
import {ProfileActionsDataItemType} from '../../../../assets';

const circleSize = Math.min(horizontalScale(50), verticalScale(50));

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
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileAction;
