import React from 'react';
import {Text, View} from 'react-native';
import {PrimaryFonts, SVGS} from '../../assets';
import {CustomIcon, CustomIconNames} from '../../components';

const HomeScreen = () => {
  return (
    <View>
      <Text
        style={{
          fontFamily: PrimaryFonts.SemiBold,
        }}>
        Home
      </Text>
      <CustomIcon name={CustomIconNames.Delivery} size={100} />
      <CustomIcon name={CustomIconNames.RestaurantPlate} size={100} />
      <CustomIcon name={CustomIconNames.AmazonPay} size={100} />
      <SVGS.YelpLogo width={200} height={200} />
    </View>
  );
};

export default HomeScreen;
