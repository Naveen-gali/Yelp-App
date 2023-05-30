import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CustomIcon, CustomIconNames} from '../../../../components';
import {fontStyles} from '../../../../constants';
import {CategoryItemProps} from './CategoryItem.types';

const CategoryItem = (props: CategoryItemProps) => {
  const {
    title,
    alias,
    style,
    iconStyle,
    labelStyle,
    arrowStyle,
    onPress,
    showIcon,
    showArrow,
  } = props;
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.labelContainer}>
        {showIcon ? (
          <CustomIcon
            name={
              CustomIconNames[alias as keyof typeof CustomIconNames] ??
              CustomIconNames.delivery
            }
            size={28}
            style={[iconStyle]}
          />
        ) : null}
        <Text style={[fontStyles.b2_Text_Regular, labelStyle]}>{title}</Text>
      </View>
      {showArrow ? (
        <CustomIcon
          name={CustomIconNames.ArrowForward}
          size={30}
          style={arrowStyle}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
  },
});

export {CategoryItem};
