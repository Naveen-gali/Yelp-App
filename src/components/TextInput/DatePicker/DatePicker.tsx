import React, {forwardRef, useState} from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {DatePickerProps} from './DatePicker.types';
import {TextInput} from '../TextInput';
import {TouchableOpacity} from 'react-native';
import {useThemeColor} from '../../../hooks';

const DatePicker = forwardRef((props: DatePickerProps, ref) => {
  const {
    onConfirm,
    onCancel,
    onChangeText,
    onBlur,
    value,
    date,
    mode,
    style,
    error,
    errorMessage,
    textInputProps,
    ...restProps
  } = props;

  const [showDatePicker, setShowDatePicker] = useState(false);

  function renderDatePicker() {
    return (
      <DateTimePicker
        mode={mode}
        onConfirm={selectedDate => {
          onConfirm(selectedDate);
          setShowDatePicker(false);
        }}
        onCancel={() => {
          onCancel();
          setShowDatePicker(false);
        }}
        isVisible={showDatePicker}
        date={date}
        maximumDate={new Date()}
        {...restProps}
      />
    );
  }

  const {colors} = useThemeColor();

  return (
    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={style}>
      <TextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        label={'Date'}
        mode={'outline'}
        autoCorrect={false}
        editable={false}
        defaultValue={value}
        inputStyle={{
          backgroundColor: colors.background,
        }}
        labelStyle={{
          backgroundColor: colors.background,
        }}
        error={!!error}
        errorMessage={errorMessage}
        onTouchStart={() => setShowDatePicker(true)}
        ref={ref}
        {...textInputProps}
      />
      {renderDatePicker()}
    </TouchableOpacity>
  );
});

export {DatePicker};
