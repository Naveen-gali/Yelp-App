import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, CustomIconNames} from '../../../../../components';
import {DeviceUtils, scale, verticalScale} from '../../../../../utils';
import {SearchCarouselItemProps} from './SearchCarouselItem.types';
import {useThemeColor} from '../../../../../hooks';
import {fontStyles} from '../../../../../constants';

const SearchCarouselItem = (props: SearchCarouselItemProps) => {
  const {colors} = useThemeColor();
  return (
    <View style={styles.rootContainer}>
      <Image
        source={{uri: props.image}}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.overflowContainer}>
        <Text style={[{color: colors.text2}, fontStyles.h1_Bold]}>
          {props.name}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            mode="default"
            onPress={() => {}}
            icon={CustomIconNames.Search}
            iconStyle={[{color: colors.text2}, fontStyles.b1_Medium]}
            style={styles.button}
            textStyle={fontStyles.b1_Medium}>
            {props.buttonText}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {flex: 1, justifyContent: 'center'},
  overflowContainer: {
    position: 'absolute',
    alignItems: 'flex-start',
    marginLeft: scale(15),
  },
  image: {
    width: DeviceUtils.getDeviceWidth(),
    height: verticalScale(250),
  },
  buttonContainer: {
    marginTop: verticalScale(15),
  },
  button: {
    padding: scale(10),
  },
});

export {SearchCarouselItem};