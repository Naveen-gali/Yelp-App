import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {EventItem} from '../../components';
import {useThemeColor} from '../../hooks';
import {RootStoreContext} from '../../models';
import {SearchCarouselService} from '../../services';
import {DeviceUtils, getItemsFromAsyncStorage} from '../../utils';
import {HomeScreenProps} from './HomeScreen.types';
import {CarouselDataItem, SearchCarousel} from './components';

const HomeScreen = observer((_props: HomeScreenProps) => {
  const {events} = useContext(RootStoreContext);
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
        events.getAllEvents(_location);
      }
    });
  };

  useEffect(() => {
    getEvents();
    getSearchCarouselData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {colors} = useThemeColor();

  const renderMainContent = () => {
    return (
      <>
        <SearchCarousel carouselData={searchCarouselData ?? []} />
        {events.allEvents.map(e => {
          return (
            <EventItem
              name={e.name}
              imageUrl={e.image_url}
              onPress={() => {}}
            />
          );
        })}
      </>
    );
  };

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
      return renderMainContent();
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>{renderContent()}</ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  loaderView: {
    height: DeviceUtils.getDeviceWindowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {HomeScreen};
