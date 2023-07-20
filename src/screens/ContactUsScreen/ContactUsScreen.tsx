import React, {useContext, useState} from 'react';
import {
  Alert,
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils';
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
import validator from 'validator';
import {SchemaType} from './ContactUsScreen.types';

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

enum InputTypes {
  textInput = 'TextInput',
  datePicker = 'DatePicker',
  countryCodePicker = 'CountryCodePicker',
}

const ContactUsScreen = () => {
  const schema: SchemaType = z.object({
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
      .refine(val => {
        console.log(
          'PHONE VAL :_ ',
          validator.isMobilePhone(
            val.toString(),
            validator.isMobilePhoneLocales.find(mp =>
              mp.includes(getValues('country_code')),
            ),
            {
              strictMode: true,
            },
          ),
        );
        console.log('VALUE :_ ', typeof val);
        return validator.isMobilePhone(
          val.toString(),
          validator.isMobilePhoneLocales.find(mp =>
            mp.includes(getValues('country_code')),
          ),
          {
            strictMode: false,
          },
        );
      }),
    query: z.string().min(1),
    date: z.string(),
  });
  const {handleSubmit, control, setValue, getValues} = useForm<Inputs>({
    progressive: true,
    resolver: zodResolver(schema),
  });

  const [isSavingQuery, setIsSavingQuery] = useState(ScreenStatus.DEFAULT);
  const [date, setDate] = useState(new Date());

  const {colors} = useThemeColor();

  const {user} = useContext(RootStoreContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParams>>();

  const getDefaultValue = (name: keyof Inputs, value: string) => {
    if (name === 'date') {
      return value?.toString();
    } else if (name === 'country_code') {
      return value;
    }
    return undefined;
  };

  const reference = firebase
    .app()
    .database('https://yelp-app-e7dc6-default-rtdb.firebaseio.com/')
    .ref('/queries/');

  const onSubmit: SubmitHandler<Inputs> = async data => {
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
    name: keyof Inputs,
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
    name: keyof Inputs,
    label: string,
    mode: InputTypes,
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
        render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
          if (mode === InputTypes.textInput) {
            name === 'phone_number' ? console.log('VALE :_ ', value) : null;
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
          } else if (mode === InputTypes.datePicker) {
            return (
              <DatePicker
                onConfirm={selectedDate => {
                  setValue('date', selectedDate?.toLocaleDateString(), {
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
                  console.log(
                    'SELECTED VAL CODE CCA2:_ ',
                    validator.isMobilePhoneLocales.find(mp =>
                      mp.includes(c.cca2),
                    ),
                  );
                  setValue('country_code', '+ ' + c.callingCode, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                onClose={() => {}}
                withAlphaFilter={true}
                withCallingCode={true}
                withCountryNameButton={false}
                containerButtonStyle={styles.containerButtonStyle}
                label={label}
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
      InputTypes.textInput,
      {
        multiline: false,
      },
    );
  }

  function renderAgeField() {
    return renderTextInputController(
      'age',
      Strings.contactUs.ageFieldLabel,
      InputTypes.textInput,
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
      InputTypes.textInput,
      {
        multiline: false,
        autoCorrect: false,
        autoCapitalize: 'none',
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
      InputTypes.countryCodePicker,
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
      InputTypes.textInput,
      {
        multiline: false,
        keyboardType: 'number-pad',
        style: styles.phoneNumberInput,
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
      InputTypes.datePicker,
      {
        selectTextOnFocus: false,
      },
    );
  }

  function renderQueryField() {
    return renderTextInputController(
      'query',
      Strings.contactUs.queryFieldLabel,
      InputTypes.textInput,
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
    width: '35%',
  },
  phoneNumberInput: {
    width: '55%',
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
