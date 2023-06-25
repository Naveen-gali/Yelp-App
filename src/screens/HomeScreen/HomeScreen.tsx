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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {EventItem, SearchBar} from '../../components';
import {useThemeColor} from '../../hooks';
import {Strings} from '../../i18n';
import {RootStoreContext} from '../../models';
import {SearchCarouselService} from '../../services';
import {DeviceUtils, horizontalScale, verticalScale} from '../../utils';
import {HomeScreenProps} from './HomeScreen.types';
import {CarouselDataItem, CategorySection, SearchCarousel} from './components';

const circleSize = Math.min(horizontalScale(50), verticalScale(50));

const HomeScreen = observer((_props: HomeScreenProps) => {
  const {events, categories} = useContext(RootStoreContext);
  const [searchCarouselData, setSearchCarouselData] =
    useState<CarouselDataItem[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);

  const onEventItemPress = useCallback(() => {
    // TODO: Add This Functions once ready
  }, []);

  const onChangeTextSearchBar = useCallback(() => {
    // TODO: Add This Functions once ready
  }, []);

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
        setEventsLoading(true);
        events.getAllEvents(_location).then(() => setEventsLoading(false));
      }
    },
    [events],
  );

  const getCategories = useCallback(() => {
    setCategoriesLoading(true);
    categories.getAllCategories().then(() => {
      setCategoriesLoading(false);
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
        onChangeText={onChangeTextSearchBar}
        style={[
          styles.searchbar,
          {
            backgroundColor: colors.loader,
            shadowColor: colors.shadow,
          },
        ]}
        placeholderTextColor={colors.placeholder}
        placeholder={Strings.searchbar.placeholder}
        inputStyle={styles.input}
      />
    );
  };

  const renderCategorySectionSkeleton = () => {
    return (
      <>
        <View style={styles.shimmerItemsRowContainer}>
          <View style={styles.shimmerItemContainer}>
            <View style={styles.shimmerItemLogo} />
            <View style={styles.shimmerItemText} />
          </View>
          <View style={styles.shimmerItemContainer}>
            <View style={styles.shimmerItemLogo} />
            <View style={styles.shimmerItemText} />
          </View>
          <View style={styles.shimmerItemContainer}>
            <View style={styles.shimmerItemLogo} />
            <View style={styles.shimmerItemText} />
          </View>
          <View style={styles.shimmerItemContainer}>
            <View style={styles.shimmerItemLogo} />
            <View style={styles.shimmerItemText} />
          </View>
        </View>
        <View style={styles.shimmerItemsRowContainer}>
          <View style={styles.shimmerItemContainer}>
            <View style={styles.shimmerItemLogo} />
            <View style={styles.shimmerItemText} />
          </View>
          <View style={styles.shimmerItemContainer}>
            <View style={styles.shimmerItemLogo} />
            <View style={styles.shimmerItemText} />
          </View>
          <View style={styles.shimmerItemContainer}>
            <View style={styles.shimmerItemLogo} />
            <View style={styles.shimmerItemText} />
          </View>
          <View style={styles.shimmerItemContainer}>
            <View style={styles.shimmerItemLogo} />
            <View style={styles.shimmerItemText} />
          </View>
        </View>
        <View style={styles.horizontalLineShimmer} />
      </>
    );
  };

  const renderEventsSectionSkeleton = () => {
    return (
      <>
        <View style={styles.eventShimmerContainer}>
          <View style={styles.eventItemImageShimmer} />
          <View style={styles.eventItemTitleShimmer} />
        </View>
        <View style={styles.eventShimmerContainer}>
          <View style={styles.eventItemImageShimmer} />
          <View style={styles.eventItemTitleShimmer} />
        </View>
        <View style={styles.eventShimmerContainer}>
          <View style={styles.eventItemImageShimmer} />
          <View style={styles.eventItemTitleShimmer} />
        </View>
      </>
    );
  };

  const renderMainContent = () => {
    return (
      <View>
        <SearchCarousel carouselData={searchCarouselData ?? []} />
        {renderSearchBar()}
        {categoriesLoading ? (
          <SkeletonPlaceholder enabled={categoriesLoading}>
            {renderCategorySectionSkeleton()}
          </SkeletonPlaceholder>
        ) : (
          <CategorySection categories={categories.featuredCategories} />
        )}
        {eventsLoading ? (
          <SkeletonPlaceholder enabled={eventsLoading}>
            {renderEventsSectionSkeleton()}
          </SkeletonPlaceholder>
        ) : (
          events.allEvents.map((e, index) => {
            return (
              <EventItem
                name={e.name}
                imageUrl={e.image_url}
                onPress={onEventItemPress}
                style={styles.eventItem}
                key={index}
                textStyle={{
                  color: colors.text,
                }}
              />
            );
          })
        )}
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
  shimmerItemContainer: {
    marginBottom: verticalScale(15),
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  shimmerItemLogo: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
  },
  shimmerItemText: {
    marginTop: verticalScale(6),
    width: horizontalScale(70),
    height: verticalScale(20),
    borderRadius: verticalScale(5),
  },
  shimmerItemsRowContainer: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  horizontalLineShimmer: {
    marginHorizontal: horizontalScale(14),
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
  },
  eventShimmerContainer: {
    marginLeft: horizontalScale(20),
    marginTop: verticalScale(20),
  },
  eventItemImageShimmer: {
    width: horizontalScale(100),
    height: verticalScale(100),
    borderRadius: verticalScale(10),
  },
  eventItemTitleShimmer: {
    marginTop: verticalScale(6),
    width: horizontalScale(260),
    height: verticalScale(30),
    borderRadius: verticalScale(5),
  },
});

export {HomeScreen};
