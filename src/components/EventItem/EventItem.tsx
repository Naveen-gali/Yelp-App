import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Constants, fontStyles} from '../../constants';
import {horizontalScale, verticalScale} from '../../utils';
import {EventItemProps} from './EventItem.types';

const EventItem = (props: EventItemProps) => {
  const {name, onPress, imageUrl, style, imageStyle, textStyle} = props;

  const getImageUrl = () => {
    if (imageUrl) {
      return imageUrl;
    } else {
      return Constants.DefaultImageUrl;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image
        source={{
          uri: getImageUrl(),
        }}
        style={[styles.image, imageStyle]}
      />
      <Text style={[fontStyles.b1_Text_Bold, textStyle]}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: verticalScale(100),
    width: horizontalScale(100),
  },
});

export {EventItem};
