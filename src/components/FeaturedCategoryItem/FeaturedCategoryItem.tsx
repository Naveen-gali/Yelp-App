import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SvgWithCssUri} from 'react-native-svg';
import {fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {getIconForCategory, horizontalScale, verticalScale} from '../../utils';
import {FeaturedCategoryItemProps} from './FeaturedCategoryItem.types';

const FeaturedCategoryItem = (props: FeaturedCategoryItemProps) => {
  const {title, alias, style, iconStyle, textStyle, onPress} = props;
  const {colors} = useThemeColor();

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <SvgWithCssUri
        uri={getIconForCategory(alias)}
        width={horizontalScale(50)}
        height={verticalScale(50)}
        style={[iconStyle]}
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export {FeaturedCategoryItem};
