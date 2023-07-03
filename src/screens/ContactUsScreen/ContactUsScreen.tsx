import React, {useContext} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Alert, Image, ScrollView, StyleSheet} from 'react-native';
import {Button, TextInput} from '../../components';
import {Constants} from '../../constants';
import {horizontalScale, verticalScale} from '../../utils';
import {firebase} from '@react-native-firebase/database';
import {RootStoreContext} from '../../models';

const circleSize = Math.min(horizontalScale(300), verticalScale(300));

type Inputs = {
  query: string;
};

const ContactUsScreen = () => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<Inputs>({
    progressive: true,
  });

  const {user} = useContext(RootStoreContext);

  const reference = firebase
    .app()
    .database('https://yelp-app-e7dc6-default-rtdb.firebaseio.com/')
    .ref('/queries/');

  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log('DATA :_ ', data);
    // .child(data.email.substring(0, 6))

    const date = new Date().getMilliseconds();

    await reference
      .child(date + user.id)
      .set({
        email: user.email,
        query: data.query,
      })
      .then(() => {
        Alert.alert('Query Raised!', 'Will get back to you shortly');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: Constants.ContactUsImageUrl}} style={styles.image} />
      <Controller
        name="query"
        control={control}
        rules={{required: true}}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            onChangeText={onChange}
            label="Query"
            value={value}
            onBlur={onBlur}
            error={errors.query ? true : false}
            style={styles.input}
            autoCorrect={false}
            multiline={true}
          />
        )}
      />
      <Button
        mode="outlined"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}>
        Submit
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
});

export {ContactUsScreen};
