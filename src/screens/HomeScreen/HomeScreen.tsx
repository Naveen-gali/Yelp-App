import {observer} from 'mobx-react-lite';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {EventItem, SearchBar} from '../../components';
import {useThemeColor} from '../../hooks';
import {Strings} from '../../i18n';
import {RootStoreContext} from '../../models';
import {SearchCarouselService} from '../../services';
import {DeviceUtils, horizontalScale, verticalScale} from '../../utils';
import {HomeScreenProps} from './HomeScreen.types';
import {CarouselDataItem, CategorySection, SearchCarousel} from './components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PrimaryStackParams} from '../../navigation';

const HomeScreen = observer((_props: HomeScreenProps) => {
  const {events, categories} = useContext(RootStoreContext);
  const [searchCarouselData, setSearchCarouselData] =
    useState<CarouselDataItem[]>();
  const [isLoading, setIsLoading] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<PrimaryStackParams>>();

  const getSearchCarouselData = () => {
    setIsLoading(true);
    SearchCarouselService.getSearchCarouselData().then(res => {
      if (res.stat === 'ok') {
        setSearchCarouselData(res.data);
        setIsLoading(false);
      }
    });
  };

  const getEvents = useCallback(
    (_location?: string) => {
      if (!events.allEvents.length) {
        events.getAllEvents(_location);
      }
    },
    [events],
  );

  const getCategories = useCallback(() => {
    setIsLoading(true);
    categories.getAllCategories().then(() => {
      setIsLoading(false);
    });
  }, [categories]);

  useEffect(() => {
    getEvents();
    getCategories();
    getSearchCarouselData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {colors} = useThemeColor();

  const renderSearchBar = () => {
    return (
      <SearchBar
        onChangeText={() => {}}
        style={[
          styles.searchbar,
          {
            backgroundColor: colors.loader,
            shadowColor: colors.shadow,
          },
        ]}
        placeholder={Strings.searchbar.placeholder}
        inputStyle={styles.input}
      />
    );
  };

  const renderMainContent = () => {
    return (
      <View>
        <SearchCarousel carouselData={searchCarouselData ?? []} />
        {renderSearchBar()}
        <CategorySection
          categories={categories.featuredCategories}
          navigation={navigation}
        />
        {events.allEvents.map((e, index) => {
          return (
            <EventItem
              name={e.name}
              imageUrl={e.image_url}
              onPress={() => {}}
              style={styles.eventItem}
              key={index}
            />
          );
        })}
      </View>
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
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar translucent={true} backgroundColor={colors.transparent} />
      <ScrollView contentContainerStyle={styles.scrollViewContentStyle}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  rootContainer: {
    height: '100%',
  },
  loaderView: {
    height: DeviceUtils.getDeviceWindowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContentStyle: {
    flexGrow: 1,
  },
  searchbar: {
    marginHorizontal: horizontalScale(17),
    padding: horizontalScale(10),
    width: horizontalScale(360),
    borderRadius: horizontalScale(6),
    marginTop: verticalScale(-25),
    shadowOffset: {
      width: 0,
      height: verticalScale(4),
    },
    shadowOpacity: verticalScale(0.3),
    shadowRadius: verticalScale(4.65),
    elevation: 8,
  },
  input: {
    borderBottomWidth: horizontalScale(0),
  },
  eventItem: {
    marginVertical: verticalScale(10),
  },
});

export {HomeScreen};
