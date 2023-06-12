import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthStackParams, AuthStackRoute} from '../../navigation';
import {RootStoreContext} from '../../models';

const LoginScreen = () => {
  const context = useContext(RootStoreContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await GoogleSignin.getCurrentUser().then(() => {
      context.auth.signin();
    });

    return auth().signInWithCredential(googleCredential);
  }

  const getCurrentUser = () => {
    GoogleSignin.getCurrentUser().then(user => {
      console.log('USER :_ ', user);
    });
  };

  getCurrentUser();

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() =>
          onGoogleButtonPress().then(() =>
            navigation.replace(AuthStackRoute.App),
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {LoginScreen};
