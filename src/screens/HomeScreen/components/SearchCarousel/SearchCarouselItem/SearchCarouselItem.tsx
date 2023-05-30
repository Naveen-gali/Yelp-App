import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, CustomIconNames} from '../../../../../components';
import {
  DeviceUtils,
  horizontalScale,
  verticalScale,
} from '../../../../../utils';
import {SearchCarouselItemProps} from './SearchCarouselItem.types';
import {useThemeColor} from '../../../../../hooks';
import {fontStyles} from '../../../../../constants';

const SearchCarouselItem = (props: SearchCarouselItemProps) => {
  const {colors} = useThemeColor();
  const {image, name, onPress} = props;
  return (
    <View style={styles.rootContainer}>
      <Image source={{uri: image}} style={styles.image} resizeMode="stretch" />
      <View style={styles.overflowContainer}>
        <Text style={[{color: colors.text2}, fontStyles.h1_Bold]}>{name}</Text>
        <Button
          mode="default"
          onPress={onPress}
          icon={CustomIconNames.Search}
          iconStyle={[{color: colors.text2}, fontStyles.b1_Medium]}
          style={styles.button}
          textStyle={fontStyles.b1_Medium}>
          {props.buttonText}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {flex: 1, justifyContent: 'center'},
  overflowContainer: {
    position: 'absolute',
    alignItems: 'flex-start',
    marginLeft: horizontalScale(14),
  },
  image: {
    width: DeviceUtils.getDeviceWindowWidth,
    height: verticalScale(250),
  },
  button: {
    padding: horizontalScale(10),
    marginTop: verticalScale(10),
  },
});

export {SearchCarouselItem};
