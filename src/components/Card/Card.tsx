import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useThemeColor} from '../../hooks';
import {horizontalScale, verticalScale} from '../../utils';
import {CardProps} from './Card.types';

export const Card = (props: CardProps) => {
  const {children, onPress, style, ...restProps} = props;

  const {colors} = useThemeColor();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: colors.card, shadowColor: colors.border},
        style,
      ]}
      {...restProps}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(1),
    },
    shadowOpacity: 0.22,
    shadowRadius: horizontalScale(2.22),
    elevation: 3,
  },
});
