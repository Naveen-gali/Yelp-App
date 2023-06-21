import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {SvgWithCssUri} from 'react-native-svg';
import {fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {getIconForCategory, horizontalScale, verticalScale} from '../../utils';
import {FeaturedCategoryItemProps} from './FeaturedCategoryItem.types';

const FeaturedCategoryItem = (props: FeaturedCategoryItemProps) => {
  const [isSvgLoading, setIsSvgLoading] = useState(true);

  const {title, alias, style, iconStyle, textStyle, onPress} = props;
  const {colors} = useThemeColor();

  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <ShimmerPlaceholder
        visible={isSvgLoading}
        width={horizontalScale(50)}
        height={verticalScale(50)}>
        <SvgWithCssUri
          uri={getIconForCategory(alias)}
          width={horizontalScale(50)}
          height={verticalScale(50)}
          style={[iconStyle]}
          onLoad={() => setIsSvgLoading(false)}
          onError={() => setIsSvgLoading(false)}
        />
      </ShimmerPlaceholder>
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
