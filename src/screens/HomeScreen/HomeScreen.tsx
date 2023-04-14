import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SecondaryFonts} from '../../assets';
import {useThemeColor} from '../../hooks';
import {Strings} from '../../i18n';
import {EventItem} from '../../components';
import {RootStoreContext} from '../../models';
import {BusinessServiceTypes} from '../../services';
import {Pallete} from '../../theme';
import {isIos, scale, verticalScale} from '../../utils';
import {HomeScreenProps} from './HomeScreen.types';

const HomeScreen = observer((_props: HomeScreenProps) => {
  const {businesses, events} = useContext(RootStoreContext);

  const getBusinesses = (location?: string) => {
    businesses.getAllBusinesses(
      location ?? 'Indiana 1209jaoineoiance',
      false,
      BusinessServiceTypes.SearchBusinessesSortBy.Best_Match,
      10,
    );
  };

  const getEvents = (_location?: string) => {
    events.getAllEvents();
  };

  useEffect(() => {
    getBusinesses();
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {colors} = useThemeColor();

  return (
    <ScrollView>
      <Text
        style={[
          styles.businessCount,
          {
            color: colors.text,
          },
        ]}>
        {businesses.BusinessesCount}
      </Text>
      <Text>{businesses.getBusinessesTask.error?.message}</Text>
      <Text>{events.getEventDetailTask.error?.message}</Text>
      <Text>{events.eventDetail.name}</Text>
      {events.featuredEvent.name !== '' ? (
        <Text>{events.featuredEvent.name}</Text>
      ) : null}

      <Text style={[styles.businessCount, {color: colors.text}]}>
        {businesses.BusinessesCount}
      </Text>
      <Text style={{color: Pallete.primary2}}>
        {businesses.getBusinessesTask.error?.message}
      </Text>
      <View>
        <Button
          title={Strings.button.title}
          onPress={() => events.getFeaturedEvent('Texas')}
          color={isIos ? colors.text2 : colors.primary}
        />
      </View>
      <Text>Events Count: {events.EventsCount}</Text>
      <Text>{events.getEventsTask.error?.message}</Text>
      {events.allEvents.map(e => (
        <EventItem event={e} key={e.id} />
      ))}
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
