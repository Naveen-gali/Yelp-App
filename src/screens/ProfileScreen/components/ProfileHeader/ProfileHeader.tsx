import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ProfileActionsData, StatsData} from '../../../../assets';
import {CustomIcon} from '../../../../components';
import {fontStyles} from '../../../../constants';
import {useThemeColor} from '../../../../hooks';
import {DeviceUtils, horizontalScale, verticalScale} from '../../../../utils';
import {ProfileAction} from '../ProfileAction';
import {ProfileHeaderProps} from './ProfileHeader.types';

const circleSize = Math.min(horizontalScale(80), verticalScale(80));

const ProfileHeader = (props: ProfileHeaderProps) => {
  const {email, image, name, imageOnPress, photoUploading, style} = props;
  const {colors} = useThemeColor();

  const renderStats = () => {
    return StatsData.map((s, index) => (
      <View style={styles.statItem} key={index}>
        <CustomIcon
          name={s.icon}
          size={verticalScale(16)}
          color={colors.text}
        />
        <Text style={styles.statCount}>{s.count}</Text>
      </View>
    ));
  };

  const renderProfileActions = () => {
    return ProfileActionsData.map((s, index) => {
      return (
        <View style={styles.profileAction} key={index}>
          <ProfileAction icon={s.icon} label={s.label} />
          <Text style={styles.label}>{s.label}</Text>
        </View>
      );
    });
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={imageOnPress} disabled={photoUploading}>
        {photoUploading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Image source={{uri: image}} style={styles.profileImage} />
        )}
      </TouchableOpacity>
      <Text style={[fontStyles.b1_Bold, {color: colors.text}]}>{name}</Text>
      <Text style={[fontStyles.b3_Text_Regular, {color: colors.text}]}>
        {email}
      </Text>
      <View style={styles.statsContainer}>{renderStats()}</View>
      <View style={styles.profileActionsRow}>{renderProfileActions()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderView: {
    height: DeviceUtils.getDeviceWindowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: circleSize,
    width: circleSize,
    borderRadius: circleSize / 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: verticalScale(15),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
  },
  profileActionsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    paddingTop: verticalScale(5),
  },
  profileAction: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statCount: {
    paddingHorizontal: horizontalScale(5),
  },
});

export {ProfileHeader};
