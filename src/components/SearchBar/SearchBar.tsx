import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from '../TextInput';
import {horizontalScale, verticalScale} from '../../utils';
import {SearchBarProps} from './SearchBar.types';
import {CustomIcon, CustomIconNames} from '../CustomIcon';
import debounce from 'lodash.debounce';

export const SearchBar: React.FunctionComponent<SearchBarProps> = props => {
  const {style, onChangeText, ...restProps} = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(onChangeText, 500), []);

  return (
    <TextInput
      style={style}
      autoCapitalize="none"
      onChangeText={debounceSearch}
      autoCorrect={false}
      left={<CustomIcon name={CustomIconNames.Search} style={styles.icon} />}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: verticalScale(20),
    alignSelf: 'center',
    marginHorizontal: horizontalScale(2),
    paddingVertical: 10,
  },
});
