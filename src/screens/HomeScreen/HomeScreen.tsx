import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Config from 'react-native-config';
import {GetApi} from '../../api';
import {PrimaryFonts, SVGS} from '../../assets';
import {CustomIcon, CustomIconNames} from '../../components';

const HomeScreen = () => {
  useEffect(() => {
    GetApi('NYC', 'best_match', 20)
      .then(res => {
        console.log('RES ', res);
      })
      .catch(er => {
        console.log('ERR ', er);
      });
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
