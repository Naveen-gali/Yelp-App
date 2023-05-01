import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SecondaryFonts} from '../../assets';
import {EventItem} from '../../components';
import {useThemeColor} from '../../hooks';
import {Strings} from '../../i18n';
import {RootStoreContext} from '../../models';
import {SearchCarouselService} from '../../services';
import {
  DeviceUtils,
  getItemsFromAsyncStorage,
  horizontalScale,
  verticalScale,
} from '../../utils';
import {HomeScreenProps} from './HomeScreen.types';
import {CarouselDataItem, SearchCarousel} from './components';
import {Palette} from '../../theme';

const HomeScreen = observer((_props: HomeScreenProps) => {
  const {businesses, events} = useContext(RootStoreContext);
  const [searchCarouselData, setSearchCarouselData] =
    useState<CarouselDataItem[]>();
  const [isLoading, setIsLoading] = useState(false);

  const getSearchCarouselData = () => {
    setIsLoading(true);
    SearchCarouselService.getSearchCarouselData().then(res => {
      if (res.stat === 'ok') {
        setSearchCarouselData(res.data);
        setIsLoading(false);
      }
    });
  };

  const getEvents = (_location?: string) => {
    getItemsFromAsyncStorage('RootStore').then(res => {
      if (res?.allEvents.length > 0) {
        return;
      } else {
        events.getAllEvents();
      }
    });
  };

  useEffect(() => {
    businesses.getAllBusinesses('NYC');
    getEvents();

    getSearchCarouselData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {colors} = useThemeColor();

  const renderContent = () => {
    if (isLoading) {
      return (
        <View
          style={[
            styles.loaderView,
            {
              backgroundColor: colors.loaderBackground,
            },
          ]}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      );
    } else {
      return (
        <>
          <Text
            style={[
              styles.businessCount,
              {
                color: colors.text,
              },
            ]}>
            {businesses.BusinessesCount}
          </Text>
          <Text>{events.eventDetail.name}</Text>
          {events.featuredEvent.name !== '' ? (
            <Text>{events.featuredEvent.name}</Text>
          ) : null}
          <Text style={{color: Palette.primary2}}>
            {businesses.getBusinessesTask.error?.message}
          </Text>
          <Text>{events.getEventDetailTask.error?.message}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title={Strings.button.title}
              onPress={() => events.getFeaturedEvent('Texas')}
              color={DeviceUtils.isIos ? colors.text2 : colors.primary}
            />
          </View>
          <Text>Events Count: {events.EventsCount}</Text>
          <Text>{events.getEventsTask.error?.message}</Text>
          {events.allEvents.map(e => (
            <EventItem
              name={e.name}
              imageUrl={e.image_url}
              onPress={() => events.getEventDetails(e.id, false)}
              key={e.id}
            />
          ))}
          <SearchCarousel carouselData={searchCarouselData ?? []} />;
        </>
      );
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>{renderContent()}</ScrollView>
    </SafeAreaView>
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
    width: horizontalScale(200),
  },
  buttonContainer: {
    marginHorizontal: horizontalScale(30),
    backgroundColor: Palette.primary1,
    marginBottom: verticalScale(20),
  },
  loaderView: {
    height: DeviceUtils.getDeviceWindowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {HomeScreen};
