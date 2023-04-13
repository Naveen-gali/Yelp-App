import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SecondaryFonts} from '../../assets';
import {RootStoreContext} from '../../models';
import {HomeScreenProps} from './HomeScreen.types';
import {BusinessServiceTypes} from '../../services';
import {Strings} from '../../i18n';
import {scale, verticalScale, platform} from '../../utils';
import {useThemeColor} from '../../hooks';
import {Pallete} from '../../theme';

const HomeScreen = observer((_props: HomeScreenProps) => {
  const {businesses} = useContext(RootStoreContext);

  const getBusinesses = (location?: string) => {
    businesses.getAllBusinesses(
      location ?? 'Indiana 1209jaoineoiance',
      false,
      BusinessServiceTypes.SearchBusinessesSortBy.Best_Match,
      10,
    );
  };

  useEffect(() => {
    getBusinesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {colors} = useThemeColor();

  return (
    <ScrollView>
      <Text style={[styles.businessCount, {color: colors.text}]}>
        {businesses.BusinessesCount}
      </Text>
      <Text style={{color: Pallete.primary2}}>
        {businesses.getBusinessesTask.error?.message}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title={Strings.button.title}
          onPress={() => getBusinesses('oin8921981n98')}
          color={platform === 'ios' ? colors.text2 : colors.primary}
        />
      </View>
      <Image
        source={{
          uri: 'https://s3-media3.fl.yelpcdn.com/ephoto/B9oMfBlHwU_8oSe7blx_Lw/o.jpg',
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  businessCount: {
    fontFamily: SecondaryFonts.Regular,
    fontSize: verticalScale(40),
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: verticalScale(60),
    fontFamily: SecondaryFonts.Regular,
  },
  image: {
    height: verticalScale(200),
    width: scale(200),
  },
  buttonContainer: {
    marginHorizontal: scale(30),
    backgroundColor: Pallete.primary1,
  },
});

export {HomeScreen};
