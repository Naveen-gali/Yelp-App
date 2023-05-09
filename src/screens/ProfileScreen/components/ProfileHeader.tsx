import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Constants, fontStyles} from '../../../constants';
import {useThemeColor} from '../../../hooks';
import {Strings} from '../../../i18n';
import {CustomIcon} from '../../../components';
import {verticalScale} from '../../../utils';
import ProfileAction from './ProfileAction/ProfileAction';
import {ProfileActionsData, StatsData} from '../../../assets';

const ProfileHeader = () => {
  const {colors} = useThemeColor();

  return (
    <View style={styles.container}>
      <Image
        source={{uri: Constants.UserImageUrl}}
        style={styles.profileImage}
      />
      <Text style={fontStyles.b1_Bold}>{Strings.profile.name}</Text>
      <Text style={(fontStyles.b3_Text_Regular, {color: colors.text})}>
        {Strings.profile.location}
      </Text>
      <View style={styles.statsContainer}>
        {StatsData.map((s, index) => (
          <View style={styles.statItem} key={index}>
            <CustomIcon name={s.icon} size={verticalScale(16)} />
            <Text style={styles.statCount}>{s.count}</Text>
          </View>
        ))}
      </View>
      <View style={styles.profileActionsRow}>
        {ProfileActionsData.map((s, index) => {
          return (
            <View style={styles.profileAction} key={index}>
              <ProfileAction icon={s.icon} />
              <Text style={styles.label}>{s.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: 80,
    width: 80,
    // TODO: Ask about this
    borderRadius: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
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
    paddingHorizontal: 5,
  },
});

export default ProfileHeader;
