import React from 'react';
import {Text, View} from 'react-native';
import Delivery from '../../assets/icons/delivery_bike.svg';
import Restaurant from '../../assets/icons/restaurant-waiter.svg';

const HomeScreen = () => {
  return (
    <View>
      <Text>Home</Text>
      <Delivery width={100} height={100} />
      <Restaurant width={100} height={100} />
    </View>
  );
};

export default HomeScreen;
