import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Config from 'react-native-config';
import {GetApi} from '../../api';
import {PrimaryFonts} from '../../assets';
import Delivery from '../../assets/icons/delivery_bike.svg';
import Restaurant from '../../assets/icons/restaurant-waiter.svg';

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
      <Delivery width={100} height={100} />
      <Restaurant width={100} height={100} />
    </View>
  );
};

export default HomeScreen;
