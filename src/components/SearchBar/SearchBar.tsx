import debounce from 'lodash.debounce';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {horizontalScale, verticalScale} from '../../utils';
import {CustomIcon, CustomIconNames} from '../CustomIcon';
import {TextInput} from '../TextInput';
import {SearchBarProps} from './SearchBar.types';

export const SearchBar: React.FunctionComponent<SearchBarProps> = props => {
  const {style, onChangeText, ...restProps} = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(onChangeText, 500), []);

  const {colors} = useThemeColor();

  const leftIcon = (
    <CustomIcon
      name={CustomIconNames.Search}
      style={[styles.icon, fontStyles.h3_Bold, {color: colors.text}]}
    />
  );

  return (
    <TextInput
      style={style}
      autoCapitalize="none"
      onChangeText={debounceSearch}
      autoCorrect={false}
      left={leftIcon}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    marginHorizontal: horizontalScale(2),
    paddingVertical: verticalScale(10),
  },
});
