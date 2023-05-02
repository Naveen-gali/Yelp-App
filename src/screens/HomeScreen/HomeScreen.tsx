import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useThemeColor} from '../../hooks';
import {SearchCarouselService} from '../../services';
import {DeviceUtils} from '../../utils';
import {HomeScreenProps} from './HomeScreen.types';
import {CarouselDataItem, CategorySection, SearchCarousel} from './components';

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
          <SearchCarousel carouselData={searchCarouselData ?? []} />
          <CategorySection />
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
  loaderView: {
    height: DeviceUtils.getDeviceWindowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {HomeScreen};
