import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SettingsItemProps} from './SettingsItem.types';
import {CustomIcon, CustomIconNames} from '../../../../components';
import {TouchableOpacity} from 'react-native';
import {fontStyles} from '../../../../constants';
import {getCustomIconsForCategories} from '../../../../utils';

const SettingsItem = (props: SettingsItemProps) => {
  const {title, alias, style, iconStyle, labelStyle, arrowStyle} = props;
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        <CustomIcon
          name={getCustomIconsForCategories(alias)}
          size={28}
          style={[iconStyle]}
        />
        <Text style={[fontStyles.b2_Text_Regular, labelStyle]}>{title}</Text>
      </View>
      <CustomIcon
        name={CustomIconNames.ArrowForward}
        size={30}
        style={arrowStyle}
      />
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

export {SettingsItem};
