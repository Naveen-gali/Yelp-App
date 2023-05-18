import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SvgWithCssUri} from 'react-native-svg';
import {fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {
  FeaturedCategories,
  getIconForCategory,
  verticalScale,
} from '../../utils';
import {CategoryItemProps} from './CategoryItem.types';

const CategoryItem = (props: CategoryItemProps) => {
  const {title, alias, style, iconStyle, textStyle} = props;

  const {colors} = useThemeColor();
  return (
    <TouchableOpacity style={[styles.iconContainer, style]}>
      <SvgWithCssUri
        uri={getIconForCategory(alias as keyof typeof FeaturedCategories)}
        width={50}
        height={50}
        style={[styles.icon, iconStyle]}
      />
      <Text
        style={[
          styles.text,
          fontStyles.b4_Text_Regular,
          {color: colors.text},
          textStyle,
        ]}
        numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: verticalScale(4),
  },
  text: {
    textAlign: 'center',
  },
});

export {CategoryItem};
