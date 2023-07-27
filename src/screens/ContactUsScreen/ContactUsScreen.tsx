import React, {useContext, useState} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {horizontalScale, PhoneUtils, verticalScale} from '../../utils';
import {Strings} from '../../i18n';
import {
  Controller,
  ControllerRenderProps,
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
  const {handleSubmit, control, register, setValue, getValues, setFocus} =
    useForm<ContactUsInputs>({
      progressive: true,
      resolver: zodResolver(schema),
    });

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

  const dataSavedAlert = (title: string, description: string) =>
    Alert.alert(title, description, [
      {
        onPress: () => navigation.goBack(),
      },
    ]);

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
          dataSavedAlert(
            Strings.contactUs.successAlertTitle,
            Strings.contactUs.successAlertDescription,
          );
        },
        () => {
          setIsSavingQuery(ScreenStatus.SUCCESS);
          dataSavedAlert(
            Strings.contactUs.errorAlertTitle,
            Strings.contactUs.errorAlertDescription,
          );
        },
      );
  };

  function renderTextInput(
    field: ControllerRenderProps<ContactUsInputs, keyof ContactUsInputs>,
    label: string,
    error: FieldError | undefined,
    defaultValue: string | undefined,
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
        onChangeText={field.onChange}
        mode="outline"
        error={!!error}
        editable={true}
        autoCorrect={false}
        label={label}
        multiline={false}
        {...field}
        {...register(field.name)}
        {...textInputProps}
      />
    );
  }

  function renderDatePicker(
    field: ControllerRenderProps<ContactUsInputs, keyof ContactUsInputs>,
    error: FieldError | undefined,
    textInputProps?: Omit<TextInputProps, 'onChangeText'>,
  ) {
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
        value={getDefaultValue(field.name, field.value)}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        style={styles.input}
        error={error}
        errorMessage={error?.message}
        textInputProps={textInputProps}
        ref={field.ref}
      />
    );
  }

  function renderCountryCodePicker(
    field: ControllerRenderProps<ContactUsInputs, keyof ContactUsInputs>,
    label: string,
    error?: FieldError,
    onSelect?: () => void,
    textInputProps?: Omit<TextInputProps, 'onChangeText'>,
  ) {
    return (
      <CountryPicker
        onChangeText={field.onChange}
        style={styles.countryCodeInput}
        onSelect={c => {
          setValue('country_code', '+' + c.callingCode, {
            shouldValidate: true,
            shouldDirty: true,
          });
          setValue('country_locale', c.cca2);
          onSelect ? onSelect() : null;
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
        {...field}
        value={getDefaultValue(field.name, field.value)}
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
    onSelect?: () => void,
  ) {
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field, fieldState: {error}}) => {
          if (mode === ContactUsInputTypes.textInput) {
            return renderTextInput(field, label, error, undefined, {
              style: styles.input,
              errorMessage: error?.message,
              focusable: true,
              ...textInputProps,
            });
          } else if (mode === ContactUsInputTypes.datePicker) {
            return renderDatePicker(field, error, textInputProps);
          } else {
            return renderCountryCodePicker(
              field,
              label,
              error,
              onSelect,
              textInputProps,
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
        returnKeyType: 'next',
        onSubmitEditing: () => setFocus('age'),
      },
    );
  }

  function renderAgeField() {
    return renderTextInputController(
      'age',
      Strings.contactUs.ageFieldLabel,
      ContactUsInputTypes.textInput,
      {
        keyboardType: 'number-pad',
        onSubmitEditing: () => setFocus('email'),
        returnKeyType: 'done',
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
        autoCorrect: false,
        autoCapitalize: 'none',
        keyboardType: 'email-address',
        onSubmitEditing: () => setFocus('country_code'),
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
      {},
      () => setFocus('phone_number'),
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
        returnKeyType: 'done',
        onSubmitEditing: () => setFocus('query'),
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
        inputStyle: styles.textArea,
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
  textArea: {
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
