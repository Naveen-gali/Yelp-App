import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LocaleUtils, horizontalScale, verticalScale} from '../../utils';
import {CategoryItemProps} from './CategoryItem.types';
import {SvgWithCssUri} from 'react-native-svg';
import {fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';

const CategoryItem = (props: CategoryItemProps) => {
  const {icon, title, style, iconStyle} = props;

  const {colors} = useThemeColor();
  return (
    <TouchableOpacity style={[styles.iconContainer, style]}>
      <SvgWithCssUri
        uri={icon}
        width={50}
        height={50}
        style={[styles.icon, iconStyle]}
      />
      <Text style={(fontStyles.b3_Text_Regular, {color: colors.text})}>
        {LocaleUtils.localizedText(title)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: verticalScale(4),
  },
});

export {CategoryItem};
