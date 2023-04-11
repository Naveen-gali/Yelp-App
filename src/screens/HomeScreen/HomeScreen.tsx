import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SecondaryFonts} from '../../assets';
import {RootStoreContext} from '../../models';
import {HomeScreenProps} from './HomeScreen.types';
import {BusinessServiceTypes} from '../../services';
import {Strings} from '../../i18n';
import {scale, verticalScale} from '../../utils';

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

  return (
    <ScrollView>
      <Text style={styles.businessCount}>{businesses.BusinessesCount}</Text>
      <Text>{businesses.getBusinessesTask.error?.message}</Text>
      <View>
        <Button
          title={Strings.button.title}
          onPress={() => getBusinesses('oin8921981n98')}
        />
      </View>
      <Image
        source={{
          uri: 'https://s3-media3.fl.yelpcdn.com/ephoto/B9oMfBlHwU_8oSe7blx_Lw/o.jpg',
        }}
        style={{
          height: verticalScale(200),
          width: scale(200),
        }}
        resizeMode="contain"
      />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  businessCount: {
    fontFamily: SecondaryFonts.Regular,
    fontSize: 40,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 60,
    fontFamily: SecondaryFonts.Regular,
  },
});

export {HomeScreen};
