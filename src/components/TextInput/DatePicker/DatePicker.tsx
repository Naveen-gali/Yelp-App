import React, {useState} from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {DatePickerProps} from './DatePicker.types';
import {TextInput} from '../TextInput';
import {TouchableOpacity} from 'react-native';
import {useThemeColor} from '../../../hooks';

const DatePicker = (props: DatePickerProps) => {
  const {onConfirm, onCancel, onChangeText, onBlur, value, date, mode, style} =
    props;

  const [showDatePicker, setShowDatePicker] = useState(false);

  function renderDatePicker() {
    if (showDatePicker) {
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
        />
      );
    }
  }

  const {colors} = useThemeColor();

  return (
    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
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
        onTouchStart={() => setShowDatePicker(true)}
        style={style}
      />
      {renderDatePicker()}
    </TouchableOpacity>
  );
};

export {DatePicker};
