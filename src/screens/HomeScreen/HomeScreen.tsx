import React from 'react';
import {ScrollView, Text} from 'react-native';
import {PrimaryFonts, SVGS} from '../../assets';
import {CustomIcon, CustomIconNames} from '../../components';

const HomeScreen = () => {
  return (
    <ScrollView>
      <Text
        style={{
          fontFamily: PrimaryFonts.SemiBold,
        }}>
        Home
      </Text>
      <CustomIcon name={CustomIconNames.Delivery} size={100} />
      <CustomIcon name={CustomIconNames.RestaurantPlate} size={100} />
      <CustomIcon name={CustomIconNames.AmazonPay} size={100} />
      <CustomIcon name={CustomIconNames.Arts} size={100} />
      <CustomIcon name={CustomIconNames.Education} size={100} />
      <CustomIcon name={CustomIconNames.Events} size={100} />
      <CustomIcon name={CustomIconNames.Finance} size={100} />
      <CustomIcon name={CustomIconNames.Government} size={100} />
      <CustomIcon name={CustomIconNames.Pets} size={100} />
      <CustomIcon name={CustomIconNames.Professional} size={100} />
      <CustomIcon name={CustomIconNames.Religious} size={100} />
      <SVGS.YelpLogo width={200} height={200} />
      <Text>CAtegory SVGS</Text>
      <SVGS.Active width={100} height={100} />
      <SVGS.Automotive width={100} height={100} />
      <SVGS.Barber width={100} height={100} />
      <SVGS.HomeServices width={100} height={100} />
      <SVGS.NightLife width={100} height={100} />
      <SVGS.Restaurant width={100} height={100} />
      <SVGS.Shopping width={100} height={100} />
    </ScrollView>
  );
};

export default HomeScreen;
