import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PrimaryFonts} from '../../../../assets';
import {Button} from '../../../../components';
import {scale, verticalScale} from '../../../../utils';
import {CarouselDataItemProps} from './CarouselDataItem.types';

const CarouselDataItem = (props: CarouselDataItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.name}</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="default"
          onPress={() => {}}
          icon="search"
          iconStyle={styles.icon}
          style={styles.button}
          textStyle={styles.btnText}>
          {props.buttonText}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'flex-start',
    marginLeft: scale(15),
  },
  name: {
    fontSize: verticalScale(28),
    color: '#ffffff',
    fontFamily: PrimaryFonts.SemiBold,
  },
  buttonContainer: {
    marginTop: verticalScale(15),
  },
  icon: {
    color: '#ffffff',
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
