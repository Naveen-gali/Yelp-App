import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker, {
  Image as ImagePickerResultProps,
} from 'react-native-image-crop-picker';
import {ProfileActionsData, StatsData} from '../../../../assets';
import {CustomIcon} from '../../../../components';
import {fontStyles} from '../../../../constants';
import {useThemeColor} from '../../../../hooks';
import {DeviceUtils, horizontalScale, verticalScale} from '../../../../utils';
import {ProfileAction} from '../ProfileAction';
import {ProfileHeaderProps} from './ProfileHeader.types';

const circleSize = Math.min(horizontalScale(80), verticalScale(80));

const ProfileHeader = (props: ProfileHeaderProps) => {
  const {email, image, name} = props;
  const {colors} = useThemeColor();

  const [photoUploading, setPhotoUploading] = useState(false);
  const [profileImage, setProfileImage] = useState(image);

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

  const reference = storage().ref(name);

  const getImagePickerResultUrl = (result: ImagePickerResultProps) => {
    if (DeviceUtils.isIos && result.sourceURL) {
      return result.sourceURL;
    } else {
      return result.path;
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
    });

    console.log('PICKER RESULT :_ ', result);

    if (result) {
      setPhotoUploading(true);
      await reference.putFile(getImagePickerResultUrl(result)).then(res => {
        console.log('RES :_ ', res);
        setPhotoUploading(false);
      });
    } else {
      // TODO: HardCoded Strings
      Alert.alert('Photo Upload Error', 'Try After SomeTime');
    }
  };

  const getImageUrl = async () => {
    const url = await storage().ref(name).getDownloadURL();
    console.log('Image Url :- ', url);
    if (url) {
      setProfileImage(url);
    }
  };

  useEffect(() => {
    getImageUrl();
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} disabled={photoUploading}>
        {photoUploading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        )}
      </TouchableOpacity>
      <Text style={fontStyles.b1_Bold}>{name}</Text>
      <Text style={(fontStyles.b3_Text_Regular, {color: colors.text})}>
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
    opacity: 100,
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
