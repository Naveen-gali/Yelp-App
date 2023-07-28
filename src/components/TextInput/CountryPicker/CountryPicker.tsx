import {CountryPicker as RNCountryPicker} from 'react-native-country-picker-modal/lib/CountryPicker';
import {CountryPickerProps} from './CountryPicker.types';
import React, {forwardRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from '../TextInput';
import {useThemeColor} from '../../../hooks';

const CountryPicker = forwardRef((props: CountryPickerProps, ref) => {
  const {
    onSelect,
    onClose,
    onChangeText,
    onBlur,
    value,
    style,
    label,
    textInputProps,
    containerButtonStyle,
    error,
    errorMessage,
    ...restProps
  } = props;
  const [showCountryCodePicker, setShowCountryCodePicker] = useState(false);

  const {colors} = useThemeColor();

  function renderCountryPicker() {
    return (
      <RNCountryPicker
        onSelect={selectedCountry => {
          onSelect(selectedCountry);
          setShowCountryCodePicker(false);
        }}
        onClose={() => {
          onClose();
          setShowCountryCodePicker(false);
        }}
        visible={showCountryCodePicker}
        containerButtonStyle={[
          styles.containerButtonStyle,
          containerButtonStyle,
        ]}
        {...restProps}
      />
    );
  }

  return (
    <TouchableOpacity
      onPress={() => setShowCountryCodePicker(true)}
      style={style}>
      <TextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        defaultValue={value}
        onTouchStart={() => setShowCountryCodePicker(true)}
        editable={false}
        autoCorrect={false}
        mode={'outline'}
        inputStyle={{
          backgroundColor: colors.background,
        }}
        label={label}
        labelStyle={textInputProps?.labelStyle}
        error={!!error}
        errorMessage={errorMessage}
        ref={ref}
        {...textInputProps}
      />
      {renderCountryPicker()}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  containerButtonStyle: {
    opacity: 0,
    height: 0,
  },
});

export {CountryPicker};
