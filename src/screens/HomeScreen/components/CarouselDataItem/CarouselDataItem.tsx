import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {PrimaryFonts} from '../../../../assets';
import {Button} from '../../../../components';
import {getWidth, scale, verticalScale} from '../../../../utils';
import {CarouselDataItemProps} from './CarouselDataItem.types';
import {useThemeColor} from '../../../../hooks';

const CarouselDataItem = (props: CarouselDataItemProps) => {
  const {colors} = useThemeColor();
  return (
    <View style={styles.rootContainer}>
      <Image
        source={{uri: props.image}}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.overflowContainer}>
        <Text style={[styles.name, {color: colors.text2}]}>{props.name}</Text>
        <View style={styles.buttonContainer}>
          <Button
            mode="default"
            onPress={() => {}}
            icon="search"
            iconStyle={[styles.icon, {color: colors.text2}]}
            style={styles.button}
            textStyle={styles.btnText}>
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
    width: getWidth('window'),
    height: verticalScale(250),
  },
  name: {
    fontSize: verticalScale(28),
    fontFamily: PrimaryFonts.SemiBold,
  },
  buttonContainer: {
    marginTop: verticalScale(15),
  },
  icon: {
    fontSize: verticalScale(15),
  },
  button: {
    padding: scale(10),
  },
  btnText: {
    fontSize: verticalScale(15),
  },
});

export {CarouselDataItem};
