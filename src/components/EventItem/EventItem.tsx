import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Constants, fontStyles} from '../../constants';
import {horizontalScale, verticalScale} from '../../utils';
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
      <Text style={[fontStyles.b1_Text_Bold]}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: verticalScale(100),
    width: horizontalScale(100),
  },
  container: {
    marginVertical: verticalScale(10),
  },
});

export {EventItem};
