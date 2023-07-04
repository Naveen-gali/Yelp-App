import React, {useContext} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Alert, Image, ScrollView, StyleSheet} from 'react-native';
import {Button, TextInput} from '../../components';
import {Constants} from '../../constants';
import {horizontalScale, verticalScale} from '../../utils';
import {firebase} from '@react-native-firebase/database';
import {RootStoreContext} from '../../models';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileStackParams} from '../../navigation';
import {Strings} from '../../i18n';

const circleSize = Math.min(horizontalScale(300), verticalScale(300));

type Inputs = {
  query: string;
};

const ContactUsScreen = () => {
  const {handleSubmit, control} = useForm<Inputs>({
    progressive: true,
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParams>>();

  const {user} = useContext(RootStoreContext);

  const reference = firebase
    .app()
    .database('https://yelp-app-e7dc6-default-rtdb.firebaseio.com/')
    .ref('/queries/');

  const onSubmit: SubmitHandler<Inputs> = async data => {
    await reference
      .child(user.id)
      .set({
        email: user.email,
        query: data.query,
      })
      .then(
        () => {
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

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: Constants.ContactUsImageUrl}} style={styles.image} />
      <Controller
        name="query"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
          <TextInput
            label="Query"
            mode="outline"
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            error={error ? true : false}
            errorMessage={Strings.contactUs.queryError}
            style={styles.input}
            autoCorrect={false}
            multiline={true}
            numberOfLines={10}
            editable={true}
            inputStyle={styles.TextInput}
          />
        )}
      />
      <Button
        mode="outlined"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}>
        {Strings.contactUs.submit}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(10),
  },
  input: {
    marginVertical: verticalScale(10),
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
