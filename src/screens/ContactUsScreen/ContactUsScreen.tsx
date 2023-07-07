import {firebase} from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {
  Controller,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {Alert, Image, StyleSheet} from 'react-native';
import {Button, TextInput, TextInputProps} from '../../components';
import {Constants} from '../../constants';
import {Strings} from '../../i18n';
import {RootStoreContext} from '../../models';
import {ProfileStackParams} from '../../navigation';
import {horizontalScale, verticalScale} from '../../utils';
import {KeyBoardAvoidingScrollViewWrapper} from '../../wrappers';
import {ScreenStatus} from '../../types';
import {useThemeColor} from '../../hooks';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const circleSize = Math.min(horizontalScale(300), verticalScale(300));

type Inputs = {
  name: string;
  age: string;
  email: string;
  phone_number: string;
  query: string;
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
});

const ContactUsScreen = () => {
  const {handleSubmit, control} = useForm<Inputs>({
    progressive: true,
    resolver: zodResolver(schema),
  });

  const [isSavingQuery, setIsSavingQuery] = useState(ScreenStatus.DEFAULT);

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParams>>();

  const {user} = useContext(RootStoreContext);

  const reference = firebase
    .app()
    .database(Constants.FirebaseDatabaseUrl)
    .ref('/queries/');

  const {colors} = useThemeColor();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setIsSavingQuery(ScreenStatus.LOADING);
    await reference
      .child(user.id)
      .set({
        email: user.email,
        data: data,
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
          setIsSavingQuery(ScreenStatus.ERROR);
          Alert.alert(
            Strings.contactUs.errorAlertTitle,
            Strings.contactUs.errorAlertDescription,
          );
        },
      );
  };

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
});

export {ContactUsScreen};
