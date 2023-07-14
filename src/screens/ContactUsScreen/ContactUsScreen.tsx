import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils';
import {Strings} from '../../i18n';
import {
  Controller,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {ScreenStatus} from '../../types';
import {Button, TextInput, TextInputProps} from '../../components';
import {KeyBoardAvoidingScrollViewWrapper} from '../../Wrappers';
import {Constants} from '../../constants';
import {useThemeColor} from '../../hooks';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {CountryPicker} from 'react-native-country-picker-modal/lib/CountryPicker';

const circleSize = Math.min(horizontalScale(300), verticalScale(300));

type Inputs = {
  name: string;
  age: string;
  email: string;
  phone_number: string;
  query: string;
  date: string;
  country_code: string;
};

const schema = z.object({
  name: z.string().min(7, {message: Strings.contactUs.nameErrorMessage}),
  age: z.coerce
    .number({
      invalid_type_error: Strings.contactUs.ageErrorMessage,
      required_error: 'Age is Required',
    })
    .gte(18)
    .lte(100),
  email: z
    .string({
      invalid_type_error: Strings.contactUs.emailErrorMessage,
      required_error: 'Required Field',
    })
    .email(),
  phone_number: z.coerce
    .number({
      invalid_type_error: Strings.contactUs.phoneErrorMessage,
      required_error: 'Required Field',
    })
    .gte(600000000, {message: Strings.contactUs.phoneErrorMessage})
    .lte(9999999999, {message: Strings.contactUs.phoneErrorMessage}),
  query: z.string().min(1),
  date: z.string(),
});

const ContactUsScreen = () => {
  const {handleSubmit, control, setValue} = useForm<Inputs>({
    progressive: true,
    resolver: zodResolver(schema),
  });

  const [isSavingQuery, setIsSavingQuery] = useState(ScreenStatus.DEFAULT);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCountryCodePicker, setShowCountryCodePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const {colors} = useThemeColor();

  function renderDatePicker() {
    if (showDatePicker) {
      return (
        <DateTimePicker
          onConfirm={date => {
            console.log('DATE :_ ', date);
            setValue('date', date.toLocaleDateString(), {
              shouldValidate: true,
              shouldDirty: true,
            });
            setDate(date);
            setShowDatePicker(false);
          }}
          onCancel={() => {
            console.log('CANCELLED :_ ');
            setShowDatePicker(false);
          }}
          isVisible={showDatePicker}
          mode={'date'}
          maximumDate={new Date()}
          date={date}
        />
      );
    }
  }

  function renderCountryCodePicker() {
    return (
      <CountryPicker
        visible={showCountryCodePicker}
        onSelect={c => {
          console.log('Country :_ ', c.callingCode);
          setValue('country_code', '+ ' + c.callingCode, {
            shouldValidate: true,
            shouldDirty: true,
          });
          setShowCountryCodePicker(false);
        }}
        onClose={() => setShowCountryCodePicker(false)}
        withAlphaFilter={true}
        withCallingCode={true}
        withCountryNameButton={false}
        containerButtonStyle={{
          opacity: 0,
          height: 0,
        }}
      />
    );
  }

  const getDefaultValue = (name: keyof Inputs, value: string) => {
    if (name === 'date') {
      return value?.toString();
    } else if (name === 'country_code') {
      return value;
    }
    return undefined;
  };

  function renderTextInputController(
    name: keyof Inputs,
    label: string,
    textInputProps?: Omit<TextInputProps, 'onChangeText'>,
    rules?:
      | Omit<
          RegisterOptions<Inputs, keyof Inputs>,
          'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
        >
      | undefined,
  ) {
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
          <TextInput
            label={label}
            mode="outline"
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            error={!!error}
            errorMessage={error?.message}
            style={styles.input}
            autoCorrect={false}
            editable={true}
            defaultValue={getDefaultValue(name, value)}
            {...textInputProps}
          />
        )}
      />
    );
  }

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setIsSavingQuery(ScreenStatus.LOADING);
    console.log('DATA :_ ', data);
    setIsSavingQuery(ScreenStatus.SUCCESS);
  };

  return (
    <KeyBoardAvoidingScrollViewWrapper>
      <React.Fragment>
        <Image
          source={{uri: Constants.ContactUsImageUrl}}
          style={styles.image}
        />
        {renderTextInputController('name', Strings.contactUs.nameFieldLabel, {
          multiline: false,
        })}
        {renderTextInputController(
          'age',
          Strings.contactUs.ageFieldLabel,
          {
            multiline: false,
            keyboardType: 'number-pad',
          },
          {
            required: true,
          },
        )}
        {renderTextInputController(
          'email',
          Strings.contactUs.emailFieldLabel,
          {
            multiline: false,
            autoCorrect: false,
            autoCapitalize: 'none',
          },
          {
            required: true,
          },
        )}
        {renderCountryCodePicker()}
        <View style={styles.phoneNumberRow}>
          <TouchableOpacity
            onPress={() => setShowCountryCodePicker(true)}
            style={styles.countryCodeInput}>
            {renderTextInputController('country_code', 'Country Code', {
              editable: false,
              selectTextOnFocus: false,
              inputStyle: {
                backgroundColor: colors.background,
              },
              onTouchStart: () => setShowCountryCodePicker(true),
              style: styles.countryInputDefaultStyle,
              labelStyle: {backgroundColor: colors.background},
            })}
          </TouchableOpacity>
          {renderTextInputController(
            'phone_number',
            Strings.contactUs.phoneFieldLabel,
            {
              multiline: false,
              keyboardType: 'number-pad',
              style: styles.phoneNumberInput,
            },
            {
              required: true,
            },
          )}
        </View>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          {renderTextInputController('date', 'Birth Date', {
            editable: false,
            selectTextOnFocus: false,
            inputStyle: {
              backgroundColor: colors.background,
            },
            onTouchStart: () => setShowDatePicker(true),
            labelStyle: {backgroundColor: colors.background},
          })}
        </TouchableOpacity>
        {renderDatePicker()}
        {renderTextInputController(
          'query',
          Strings.contactUs.queryFieldLabel,
          {
            multiline: true,
            numberOfLines: 10,
            inputStyle: styles.TextInput,
          },
          {required: true},
        )}
        <Button
          mode="outlined"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          isLoading={isSavingQuery === ScreenStatus.LOADING}
          loaderColor={colors.primary}>
          {Strings.contactUs.submit}
        </Button>
      </React.Fragment>
    </KeyBoardAvoidingScrollViewWrapper>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: verticalScale(7),
    marginHorizontal: horizontalScale(10),
  },
  button: {
    marginHorizontal: horizontalScale(25),
    marginVertical: verticalScale(20),
  },
  image: {
    width: circleSize,
    height: circleSize,
    alignSelf: 'center',
  },
  TextInput: {
    height: verticalScale(150),
    textAlignVertical: 'top',
  },
  dropDown: {
    height: verticalScale(100),
    borderRadius: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    borderWidth: horizontalScale(0.5),
  },
  rightIcon: {
    alignSelf: 'center',
    marginLeft: horizontalScale(10),
  },
  dateLabel: {
    marginHorizontal: horizontalScale(10),
    marginBottom: verticalScale(-5),
  },
  phoneNumberRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: verticalScale(5),
  },
  countryCodeInput: {
    width: '35%',
  },
  phoneNumberInput: {
    width: '55%',
  },
  countryInputDefaultStyle: {
    padding: 0,
  },
});

export {ContactUsScreen};
