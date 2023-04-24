import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {HomeScreenProps} from './HomeScreen.types';
import {SearchCarousel} from './components';
import {SearchCarouselService} from '../../services';
import type {SearchCarouselServiceTypes} from '../../services';
import {useThemeColor} from '../../hooks';
import {DeviceUtils} from '../../utils';
import {Pallete} from '../../theme';

const HomeScreen = observer((_props: HomeScreenProps) => {
  const [searchCarouselData, setSearchCarouselData] =
    useState<SearchCarouselServiceTypes.SearchCarouselDataType[]>();
  const [isLoading, setIsLoading] = useState(false);

  const getSearchCarouselData = () => {
    setIsLoading(true);
    SearchCarouselService.getSearchCarouselData().then(res => {
      setIsLoading(false);
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
        <View style={styles.loaderView}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      );
    } else {
      return (
        <SearchCarousel
          carouselData={
            searchCarouselData !== undefined ? searchCarouselData : []
          }
        />
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
    height: DeviceUtils.getDeviceHeight(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Pallete.neutral300,
  },
});

export {HomeScreen};
