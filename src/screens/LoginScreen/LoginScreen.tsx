import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AuthStackParams, AuthStackRoute} from '../../navigation';
import {RootStoreContext} from '../../models';
import {Constants, fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {horizontalScale, verticalScale} from '../../utils';
import {Strings} from '../../i18n';

const circleSize = Math.min(horizontalScale(300), verticalScale(300));

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

  const {colors} = useThemeColor();

  return (
    <View style={styles.container}>
      <Image source={{uri: Constants.SignUpLogoUrl}} style={styles.image} />
      <View style={styles.signInBtnContainer}>
        <Text
          style={[
            fontStyles.b1_Medium,
            {color: colors.primary},
            styles.loginText,
          ]}>
          {Strings.loginScreen.loginToYelp}
        </Text>
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
      <Text style={[fontStyles.b4_Text_Regular, styles.consentText]}>
        {Strings.loginScreen.subText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  loginText: {
    marginBottom: verticalScale(40),
  },
  consentText: {
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
  signInBtnContainer: {
    alignItems: 'center',
  },
  image: {width: circleSize, height: circleSize},
});

export {LoginScreen};
