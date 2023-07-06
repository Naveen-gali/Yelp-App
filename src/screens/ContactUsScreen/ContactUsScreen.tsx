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

const circleSize = Math.min(horizontalScale(300), verticalScale(300));

type Inputs = {
  name: string;
  age: number;
  email: string;
  phone_number: string;
  query: string;
};

const ContactUsScreen = () => {
  const {handleSubmit, control} = useForm<Inputs>({
    progressive: true,
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
    console.log('DATA :P ', data);
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
            value={value?.toString()}
            onBlur={onBlur}
            error={error ? true : false}
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
        {renderTextInputController(
          'name',
          Strings.contactUs.nameFieldLabel,
          {
            multiline: false,
            errorMessage: Strings.contactUs.nameErrorMessage,
          },
          {
            required: true,
            minLength: 7,
            pattern: /^[a-zA-Z0-9]{5,}$/,
          },
        )}
        {renderTextInputController(
          'age',
          Strings.contactUs.ageFieldLabel,
          {
            multiline: false,
            keyboardType: 'number-pad',
            errorMessage: Strings.contactUs.ageErrorMessage,
          },
          {
            required: true,
            pattern: /^(1[5-9]|[2-9]\d|\d{3,})$/,
          },
        )}
        {renderTextInputController(
          'email',
          Strings.contactUs.emailFieldLabel,
          {
            multiline: false,
            errorMessage: Strings.contactUs.emailErrorMessage,
            autoCorrect: false,
            autoCapitalize: 'none',
          },
          {
            required: true,
            pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          },
        )}
        {renderTextInputController(
          'phone_number',
          Strings.contactUs.phoneFieldLabel,
          {
            multiline: false,
            hint: Strings.contactUs.phoneHintMessage,
            errorMessage: Strings.contactUs.phoneErrorMessage,
            keyboardType: 'number-pad',
          },
          {
            required: true,
            pattern: /^[6-9]\d{9}$/,
          },
        )}
        {renderTextInputController(
          'query',
          Strings.contactUs.queryFieldLabel,
          {
            multiline: true,
            numberOfLines: 10,
            inputStyle: styles.TextInput,
            errorMessage: Strings.contactUs.queryError,
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
