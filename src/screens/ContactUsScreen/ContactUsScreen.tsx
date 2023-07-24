import React, {useContext, useState} from 'react';
import {
  Alert,
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {horizontalScale, PhoneUtils, verticalScale} from '../../utils';
import {Strings} from '../../i18n';
import {
  Controller,
  FieldError,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {ScreenStatus} from '../../types';
import {
  Button,
  CountryPicker,
  DatePicker,
  TextInput,
  TextInputProps,
} from '../../components';
import {KeyBoardAvoidingScrollViewWrapper} from '../../Wrappers';
import {Constants} from '../../constants';
import {useThemeColor} from '../../hooks';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {firebase} from '@react-native-firebase/database';
import {RootStoreContext} from '../../models';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileStackParams} from '../../navigation/ProfileStack';
import {ContactUsInputs, ContactUsInputTypes} from './ContactUsScreen.types';

const circleSize = Math.min(horizontalScale(300), verticalScale(300));

const ContactUsScreen = () => {
  //TODO: Add Schema type at last.
  const schema: any = z.object({
    name: z.string().min(7, {message: Strings.contactUs.nameErrorMessage}),
    age: z.coerce
      .number({
        invalid_type_error: Strings.contactUs.ageErrorMessage,
        required_error: Strings.contactUs.requiredField,
      })
      .gte(18)
      .lte(100),
    email: z
      .string({
        invalid_type_error: Strings.contactUs.emailErrorMessage,
        required_error: Strings.contactUs.requiredField,
      })
      .email(),
    phone_number: z.coerce
      .number({
        invalid_type_error: Strings.contactUs.phoneErrorMessage,
        required_error: Strings.contactUs.requiredField,
      })
      .refine(phoneNumber => {
        return PhoneUtils.isValidPhoneNumber(
          phoneNumber,
          getValues('country_code'),
          PhoneUtils.getCountryLocale(getValues('country_locale')),
        );
      }, Strings.contactUs.phoneErrorMessage),
    query: z.string().min(1),
    date: z.string({
      invalid_type_error: Strings.contactUs.dateErrorMessage,
      required_error: Strings.contactUs.requiredField,
    }),
    country_code: z.string({
      invalid_type_error: Strings.contactUs.countryCodeErrorMessage,
      required_error: Strings.contactUs.requiredField,
    }),
  });
  const {handleSubmit, control, setValue, getValues} = useForm<ContactUsInputs>(
    {
      progressive: true,
      resolver: zodResolver(schema),
    },
  );

  const [isSavingQuery, setIsSavingQuery] = useState(ScreenStatus.DEFAULT);
  const [date, setDate] = useState(new Date());

  const {colors} = useThemeColor();

  const {user} = useContext(RootStoreContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParams>>();

  const getDefaultValue = (name: keyof ContactUsInputs, value: string) => {
    if (name === 'date') {
      return value?.toString();
    } else if (name === 'country_code') {
      return value;
    }
    return undefined;
  };

  const reference = firebase
    .app()
    .database(Constants.FirebaseDatabaseUrl)
    .ref('/queries/');

  const onSubmit: SubmitHandler<ContactUsInputs> = async data => {
    setIsSavingQuery(ScreenStatus.LOADING);
    const date = new Date().getMilliseconds();
    await reference
      .child(date + user.id)
      .set({
        data,
      })
      .then(
        () => {
          setIsSavingQuery(ScreenStatus.SUCCESS);
          Alert.alert(
            Strings.contactUs.successAlertTitle,
            Strings.contactUs.successAlertDescription,
            [
              {
                onPress: () => navigation.goBack(),
              },
            ],
          );
        },
        () => {
          setIsSavingQuery(ScreenStatus.SUCCESS);
          Alert.alert(
            Strings.contactUs.errorAlertTitle,
            Strings.contactUs.errorAlertDescription,
            [
              {
                onPress: () => navigation.goBack(),
              },
            ],
          );
        },
      );
  };

  function renderTextInput(
    onChange: (text: string) => void,
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
    label: string,
    error: FieldError | undefined,
    value: string,
    defaultValue: string | undefined,
    name: keyof ContactUsInputs,
    textInputProps: Omit<
      TextInputProps,
      | 'onChangeText'
      | 'onBlur'
      | 'value'
      | 'label'
      | 'error'
      | 'defaultValue'
      | 'onChange'
    >,
  ) {
    return (
      <TextInput
        onChangeText={onChange}
        onBlur={onBlur}
        mode="outline"
        value={value}
        error={!!error}
        editable={true}
        autoCorrect={false}
        label={label}
        {...textInputProps}
      />
    );
  }

  function renderTextInputController(
    name: keyof ContactUsInputs,
    label: string,
    mode: ContactUsInputTypes,
    textInputProps?: Omit<TextInputProps, 'onChangeText'>,
    rules?:
      | Omit<
          RegisterOptions<ContactUsInputs, keyof ContactUsInputs>,
          'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
        >
      | undefined,
  ) {
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
          if (mode === ContactUsInputTypes.textInput) {
            return renderTextInput(
              onChange,
              onBlur,
              label,
              error,
              value,
              undefined,
              name,
              {
                style: styles.input,
                errorMessage: error?.message,
                ...textInputProps,
              },
            );
          } else if (mode === ContactUsInputTypes.datePicker) {
            return (
              <DatePicker
                onConfirm={selectedDate => {
                  setValue('date', selectedDate?.toLocaleDateString('en-GB'), {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setDate(date);
                }}
                onCancel={() => {}}
                date={date}
                mode={'date'}
                value={getDefaultValue(name, value)}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                error={error}
                errorMessage={error?.message}
                textInputProps={textInputProps}
              />
            );
          } else {
            return (
              <CountryPicker
                onBlur={onBlur}
                onChangeText={onChange}
                value={getDefaultValue(name, value)}
                style={styles.countryCodeInput}
                onSelect={c => {
                  setValue('country_code', '+' + c.callingCode, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setValue('country_locale', c.cca2);
                }}
                onClose={() => {}}
                withAlphaFilter={true}
                withCallingCode={true}
                withCountryNameButton={false}
                containerButtonStyle={styles.containerButtonStyle}
                label={label}
                error={error}
                errorMessage={error?.message}
                textInputProps={textInputProps}
              />
            );
          }
        }}
      />
    );
  }

  function renderNameField() {
    return renderTextInputController(
      'name',
      Strings.contactUs.nameFieldLabel,
      ContactUsInputTypes.textInput,
      {
        multiline: false,
      },
    );
  }

  function renderAgeField() {
    return renderTextInputController(
      'age',
      Strings.contactUs.ageFieldLabel,
      ContactUsInputTypes.textInput,
      {
        multiline: false,
        keyboardType: 'number-pad',
      },
      {
        required: true,
      },
    );
  }

  function renderEmailField() {
    return renderTextInputController(
      'email',
      Strings.contactUs.emailFieldLabel,
      ContactUsInputTypes.textInput,
      {
        multiline: false,
        autoCorrect: false,
        autoCapitalize: 'none',
        keyboardType: 'email-address',
      },
      {
        required: true,
      },
    );
  }

  function renderCountryCodeField() {
    return renderTextInputController(
      'country_code',
      'Country Code',
      ContactUsInputTypes.countryCodePicker,
      {
        selectTextOnFocus: false,
        inputStyle: {
          backgroundColor: colors.background,
        },
        style: styles.countryInputDefaultStyle,
        labelStyle: {backgroundColor: colors.background},
      },
    );
  }

  function renderPhoneNumberField() {
    return renderTextInputController(
      'phone_number',
      Strings.contactUs.phoneFieldLabel,
      ContactUsInputTypes.textInput,
      {
        multiline: false,
        keyboardType: 'phone-pad',
        style: styles.phoneNumberInput,
        hint: Strings.contactUs.phoneHintMessage,
      },
      {
        required: true,
      },
    );
  }

  function renderBirthDateField() {
    return renderTextInputController(
      'date',
      'Birth Date',
      ContactUsInputTypes.datePicker,
      {
        selectTextOnFocus: false,
      },
    );
  }

  function renderQueryField() {
    return renderTextInputController(
      'query',
      Strings.contactUs.queryFieldLabel,
      ContactUsInputTypes.textInput,
      {
        multiline: true,
        numberOfLines: 10,
        inputStyle: styles.TextInput,
      },
      {required: true},
    );
  }

  function renderPhoneNumberRow() {
    return (
      <View style={styles.phoneNumberRow}>
        {renderCountryCodeField()}
        {renderPhoneNumberField()}
      </View>
    );
  }

  return (
    <KeyBoardAvoidingScrollViewWrapper>
      <React.Fragment>
        <Image
          source={{uri: Constants.ContactUsImageUrl}}
          style={styles.image}
        />
        {renderNameField()}
        {renderAgeField()}
        {renderEmailField()}
        {renderPhoneNumberRow()}
        {renderBirthDateField()}
        {renderQueryField()}
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
    width: '34%',
  },
  phoneNumberInput: {
    width: '58%',
  },
  countryInputDefaultStyle: {
    padding: 0,
  },
  containerButtonStyle: {
    opacity: 0,
    height: 0,
  },
});

export {ContactUsScreen};
