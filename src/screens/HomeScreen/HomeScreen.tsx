import React, {useEffect} from 'react';
import {Alert, Text, View} from 'react-native';
import Config from 'react-native-config';
import {Api} from '../../api';
import {PrimaryFonts, SVGS} from '../../assets';
import {CustomIcon, CustomIconNames} from '../../components';
import {SEARCH_BUSINESS} from '../../constants';
import {ErrorType, BusinessSuccessType, SortByEnum} from './types';

const HomeScreen = () => {
  const getBusinesses = (
    location: string,
    sort_by: SortByEnum,
    limit: number,
  ) => {
    return Api<BusinessSuccessType | ErrorType>(
      SEARCH_BUSINESS +
        `?location=${location}&sort_by=${sort_by}&limit=${limit}`,
      'GET',
    )
      .then(res => {
        console.log('RES ', res);
        return res;
      })
      .catch(err => {
        console.log('ERR ', err);
        if (err.show_error_screen) {
          Alert.alert('Some Thing Went Wrong', err.error.description);
        }
        return err;
      });
  };

  useEffect(() => {
    getBusinesses('NYC', SortByEnum.Best_Match, 20);
  }, []);

  return (
    <View>
      <Text
        style={{
          fontFamily: PrimaryFonts.SemiBold,
        }}>
        Home
      </Text>
      <Text>{Config.API_URL}</Text>
      <CustomIcon name={CustomIconNames.Delivery} size={100} />
      <CustomIcon name={CustomIconNames.RestaurantPlate} size={100} />
      <CustomIcon name={CustomIconNames.AmazonPay} size={100} />
      <SVGS.YelpLogo width={200} height={200} />
    </View>
  );
};

export default HomeScreen;
