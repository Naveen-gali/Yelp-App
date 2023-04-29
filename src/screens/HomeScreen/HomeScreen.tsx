import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {SearchBar} from '../../components';
import {useThemeColor} from '../../hooks';
import {Strings} from '../../i18n';
import {SearchCarouselService} from '../../services';
import {DeviceUtils, horizontalScale, verticalScale} from '../../utils';
import {HomeScreenProps} from './HomeScreen.types';
import {CarouselDataItem, SearchCarousel} from './components';

const HomeScreen = observer((_props: HomeScreenProps) => {
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

  useEffect(() => {
    getSearchCarouselData();
  }, []);

  const {colors} = useThemeColor();

  const renderSearchBar = () => {
    return (
      <SearchBar
        onChangeText={() => {}}
        style={[styles.searchbar, {backgroundColor: colors.loader}]}
        placeholder={Strings.searchbar.placeholder}
        inputStyle={styles.input}
      />
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
      return (
        <View>
          <SearchCarousel carouselData={searchCarouselData ?? []} />
          {renderSearchBar()}
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar translucent={true} backgroundColor={'#ffffff00'} />
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
    // TODO: Ask about scaling.
    flexGrow: 1,
  },
  searchbar: {
    position: 'absolute',
    marginHorizontal: horizontalScale(17),
    padding: horizontalScale(10),
    width: horizontalScale(360),
    borderRadius: horizontalScale(6),
    bottom: verticalScale(-25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: verticalScale(4),
    },
    shadowOpacity: verticalScale(0.3),
    shadowRadius: verticalScale(4.65),
    // TODO: Ask about elevation in hori or verti scale
    elevation: 8,
    zIndex: 2,
  },
  input: {
    borderBottomWidth: horizontalScale(0),
  },
});

export {HomeScreen};
