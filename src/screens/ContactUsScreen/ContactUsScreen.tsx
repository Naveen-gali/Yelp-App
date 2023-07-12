import {zodResolver} from '@hookform/resolvers/zod';
// import {firebase} from '@react-native-firebase/database';
import React, {useState} from 'react';
import {
  Controller,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {z} from 'zod';
import {Button, TextInput, TextInputProps} from '../../components';
import {Constants} from '../../constants';
import {useThemeColor} from '../../hooks';
import {Strings} from '../../i18n';
import {ScreenStatus} from '../../types';
import {horizontalScale, verticalScale} from '../../utils';
import {KeyBoardAvoidingScrollViewWrapper} from '../../wrappers';

const circleSize = Math.min(horizontalScale(300), verticalScale(300));

type Inputs = {
  name: string;
  age: string;
  email: string;
  phone_number: string;
  query: string;
  date: string;
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
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // const navigation =
  //   useNavigation<NativeStackNavigationProp<ProfileStackParams>>();

  // const {user} = useContext(RootStoreContext);

  // const reference = firebase
  //   .app()
  //   .database(Constants.FirebaseDatabaseUrl)
  //   .ref('/queries/');

  const {colors} = useThemeColor();

  const onSubmit: SubmitHandler<Inputs> = async _data => {
    setIsSavingQuery(ScreenStatus.LOADING);
    // await reference
    //   .child(user.id)
    //   .set({
    //     email: user.email,
    //     data: data,
    //   })
    //   .then(
    //     () => {
    //       setIsSavingQuery(ScreenStatus.SUCCESS);
    //       Alert.alert(
    //         Strings.contactUs.successAlertTitle,
    //         Strings.contactUs.successAlertDescription,
    //         [
    //           {
    //             onPress: () => navigation.goBack(),
    //           },
    //         ],
    //       );
    //     },
    //     () => {
    //       setIsSavingQuery(ScreenStatus.ERROR);
    //       Alert.alert(
    //         Strings.contactUs.errorAlertTitle,
    //         Strings.contactUs.errorAlertDescription,
    //       );
    //     },
    //   );
  };

  function renderDatePicker() {
    return (
      <DatePicker
        modal
        date={date}
        open={open}
        mode="date"
        title={Strings.contactUs.birthdateLabel}
        maximumDate={new Date()}
        onConfirm={date1 => {
          setValue('date', date1.toLocaleDateString(), {
            shouldValidate: true,
            shouldDirty: true,
          });
          setDate(date1);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        style={styles.dropDown}
        androidVariant="iosClone"
      />
    );
  }

  function renderTextInputController(
    // TODO: Moving into reusable component when needed in other screens.
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
            error={error ? true : false}
            errorMessage={error?.message}
            style={styles.input}
            autoCorrect={false}
            editable={true}
            defaultValue={name === 'date' ? value?.toString() : undefined}
            {...textInputProps}
          />
        )}
      />
    );
  }

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
        <TouchableOpacity onPressIn={() => setOpen(true)}>
          {renderTextInputController('date', 'Birth Date', {
            editable: false,
            selectTextOnFocus: false,
            inputStyle: {backgroundColor: colors.background},
            onTouchStart: () => setOpen(true),
            labelStyle: {backgroundColor: colors.background},
          })}
        </TouchableOpacity>

        {renderTextInputController(
          'phone_number',
          Strings.contactUs.phoneFieldLabel,
          {
            multiline: false,
            hint: Strings.contactUs.phoneHintMessage,
            keyboardType: 'number-pad',
          },
          {
            required: true,
          },
        )}
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
        {renderDatePicker()}
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
});

export {ContactUsScreen};
