import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {LabelProps} from './Label.types';

export const Label = (props: LabelProps) => {
  const {style, label, ...restProps} = props;

  const {colors} = useThemeColor();
  return (
    <Text
      style={[
        styles.label,
        fontStyles.b1_Text_Regular,
        {color: colors.text},
        style,
      ]}
      {...restProps}>
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    flexWrap: 'wrap',
  },
});
