import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {PrimaryFonts} from '../../assets';
import {Constants} from '../../constants';
import {scale, verticalScale} from '../../utils';
import {EventItemProps} from './EventItem.types';

const EventItem = ({name, imageUrl, onPress}: EventItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: imageUrl === '' ? Constants.DefaultImageUrl : imageUrl,
        }}
        style={styles.image}
      />
      <Text style={styles.eventName}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: verticalScale(100),
    width: scale(100),
  },
  eventName: {
    fontFamily: PrimaryFonts.Medium,
  },
  container: {
    marginVertical: verticalScale(10),
  },
});

export {EventItem};
