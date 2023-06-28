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
import {ErrorView, EventItem, SearchBar} from '../../components';
import {Constants, fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {Strings} from '../../i18n';
import {RootStoreContext} from '../../models';
import {SearchCarouselService} from '../../services';
import {ScreenStatus} from '../../types';
import {DeviceUtils, horizontalScale, verticalScale} from '../../utils';
import {HomeScreenProps} from './HomeScreen.types';
import {CarouselDataItem, CategorySection, SearchCarousel} from './components';

const circleSize = Math.min(horizontalScale(50), verticalScale(50));

const HomeScreen = observer((_props: HomeScreenProps) => {
  const {events, categories} = useContext(RootStoreContext);
  const [searchCarouselData, setSearchCarouselData] =
    useState<CarouselDataItem[]>();
  const [carouselDataStatus, setCarouselDataStatus] = useState<ScreenStatus>(
    ScreenStatus.LOADING,
  );
  const [categoriesStatus, setCategoriesStatus] = useState<ScreenStatus>(
    ScreenStatus.LOADING,
  );
  const [eventsStatus, setEventsStatus] = useState<ScreenStatus>(
    ScreenStatus.LOADING,
  );

  const onEventItemPress = useCallback(() => {
    // TODO: Add This Functions once ready
  }, []);

  const onChangeTextSearchBar = useCallback(() => {
    // TODO: Add This Functions once ready
  }, []);

  const getSearchCarouselData = () => {
    setCarouselDataStatus(ScreenStatus.LOADING);
    SearchCarouselService.getSearchCarouselData().then(res => {
      if (res.stat === 'ok') {
        setSearchCarouselData(res.data);
        setCarouselDataStatus(ScreenStatus.SUCCESS);
      }
    });
  };

  const getEvents = useCallback(
    (_location?: string) => {
      setEventsStatus(ScreenStatus.LOADING);
      events
        .getAllEvents(_location)
        .then(() => setEventsStatus(ScreenStatus.SUCCESS))
        .catch(() => setEventsStatus(ScreenStatus.ERROR));
    },
    [events],
  );

  const getCategories = useCallback(() => {
    setCategoriesStatus(ScreenStatus.LOADING);
    categories
      .getAllCategories()
      .then(() => {
        setCategoriesStatus(ScreenStatus.SUCCESS);
      })
      .catch(() => {
        setCategoriesStatus(ScreenStatus.ERROR);
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

  const renderCategorySectionSkeletonItem = () => {
    return (
      <SkeletonPlaceholder.Item
        marginBottom={verticalScale(15)}
        flexDirection="column"
        justifyContent="center"
        alignItems="center">
        <SkeletonPlaceholder.Item
          width={circleSize}
          height={circleSize}
          borderRadius={circleSize / 2}
        />
        <SkeletonPlaceholder.Item
          marginTop={verticalScale(6)}
          width={horizontalScale(70)}
          height={verticalScale(20)}
          borderRadius={verticalScale(5)}
        />
      </SkeletonPlaceholder.Item>
    );
  };

  const renderCategorySectionSkeletonItemRow = () => {
    return (
      <SkeletonPlaceholder.Item
        marginTop={verticalScale(20)}
        flexDirection="row"
        justifyContent="space-evenly">
        {new Array(4).fill(null).map(() => renderCategorySectionSkeletonItem())}
      </SkeletonPlaceholder.Item>
    );
  };

  const renderCategorySectionSkeleton = () => {
    return (
      <>
        {new Array(2)
          .fill(null)
          .map(() => renderCategorySectionSkeletonItemRow())}
        <SkeletonPlaceholder.Item
          marginHorizontal={horizontalScale(14)}
          borderBottomWidth={StyleSheet.hairlineWidth * 2}
        />
      </>
    );
  };

  const renderEventsSectionSkeletonItem = () => {
    return (
      <SkeletonPlaceholder.Item
        marginLeft={horizontalScale(20)}
        marginTop={verticalScale(20)}>
        <SkeletonPlaceholder.Item
          width={horizontalScale(100)}
          height={verticalScale(100)}
          borderRadius={verticalScale(10)}
        />
        <SkeletonPlaceholder.Item
          marginTop={verticalScale(6)}
          width={horizontalScale(260)}
          height={verticalScale(30)}
          borderRadius={verticalScale(5)}
        />
      </SkeletonPlaceholder.Item>
    );
  };

  const renderEventsSectionSkeleton = () => {
    return (
      <>
        {new Array(3).fill(null).map(() => renderEventsSectionSkeletonItem())}
      </>
    );
  };

  const renderCategories = () => {
    if (categoriesStatus === ScreenStatus.LOADING) {
      return (
        <SkeletonPlaceholder
          enabled={categoriesStatus === ScreenStatus.LOADING}>
          {renderCategorySectionSkeleton()}
        </SkeletonPlaceholder>
      );
    } else if (categoriesStatus === ScreenStatus.SUCCESS) {
      return <CategorySection categories={categories.featuredCategories} />;
    } else if (categoriesStatus === ScreenStatus.ERROR) {
      return (
        <ErrorView
          text={Strings.errorViewText.categories}
          style={styles.categoriesErrorView}
          textStyle={[fontStyles.b2_Text_Regular, {color: colors.text}]}
          action={() => getCategories()}
        />
      );
    }
  };

  const renderEvents = () => {
    if (eventsStatus === ScreenStatus.LOADING) {
      return (
        <SkeletonPlaceholder enabled={eventsStatus === ScreenStatus.LOADING}>
          {renderEventsSectionSkeleton()}
        </SkeletonPlaceholder>
      );
    } else if (eventsStatus === ScreenStatus.SUCCESS) {
      return events.allEvents.map((e, index) => {
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
      });
    } else if (eventsStatus === ScreenStatus.ERROR) {
      return (
        <ErrorView
          text={Strings.errorViewText.events}
          action={() => getEvents()}
          image={Constants.ErrorUrl}
          style={styles.eventsErrorView}
        />
      );
    }
  };

  const renderMainContent = () => {
    return (
      <View>
        <SearchCarousel carouselData={searchCarouselData ?? []} />
        {renderSearchBar()}
        {renderCategories()}
        {renderEvents()}
      </View>
    );
  };

  const renderContent = () => {
    if (carouselDataStatus === ScreenStatus.LOADING) {
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
  categoriesErrorView: {
    height: verticalScale(150),
  },
  eventsErrorView: {
    marginTop: verticalScale(20),
    height: verticalScale(200),
  },
});

export {HomeScreen};
