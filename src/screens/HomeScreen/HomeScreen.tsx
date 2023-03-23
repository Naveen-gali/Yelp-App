import React from 'react';
import {Text, View} from 'react-native';
import {PrimaryFonts} from '../../assets';
import CustomIcon from '../../assets/fonts/CustomIcon';

const HomeScreen = () => {
  return (
    <View>
      <Text
        style={{
          fontFamily: PrimaryFonts.SemiBold,
        }}>
        Home
      </Text>
      <CustomIcon name="delivery" size={100} />
      <CustomIcon name="restaurant-plate" size={100} />
      <CustomIcon name="amazonpay" size={100} />
    </View>
  );
};

export default HomeScreen;
