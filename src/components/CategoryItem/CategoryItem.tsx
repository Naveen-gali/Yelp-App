import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SvgWithCssUri} from 'react-native-svg';
import {fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {LocaleUtils, horizontalScale, verticalScale} from '../../utils';
import {CategoryItemProps} from './CategoryItem.types';
import {PrimaryStackRoute} from '../../navigation';

const CategoryItem = (props: CategoryItemProps) => {
  const {icon, title, style, iconStyle, navigation, alias} = props;

  const {colors} = useThemeColor();

  return (
    <TouchableOpacity
      style={[styles.iconContainer, style]}
      onPress={() =>
        navigation.navigate(PrimaryStackRoute.CategoryDetailScreen, {
          alias,
          title: LocaleUtils.localizedText(title),
        })
      }>
      <SvgWithCssUri
        uri={icon}
        width={50}
        height={50}
        style={[styles.icon, iconStyle]}
      />
      <Text
        style={[styles.text, fontStyles.b4_Text_Regular, {color: colors.text}]}>
        {LocaleUtils.localizedText(title)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    marginHorizontal: horizontalScale(14),
    marginVertical: verticalScale(20),
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
