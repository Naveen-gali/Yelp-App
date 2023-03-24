import React from 'react';
import {Text, View} from 'react-native';
import {PrimaryFonts} from '../../assets';
import {CustomIconNames} from '../../components';
import CustomIcon from '../../components/CustomIcon/CustomIcon';
import YelpSvg from '../../assets/svgs/yelp.svg';

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
      <CustomIcon name={CustomIconNames.Restaurant_Plate} size={100} />
      <CustomIcon name={CustomIconNames.Amazon_Pay} size={100} />
      <YelpSvg width={100} height={100} />
    </View>
  );
};

export default HomeScreen;
