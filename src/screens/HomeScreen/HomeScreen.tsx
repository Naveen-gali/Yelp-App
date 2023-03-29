import {observer} from 'mobx-react-lite';
import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {PrimaryFonts, SVGS} from '../../assets';
import {CustomIcon, CustomIconNames} from '../../components';
import {YelpStoreContext} from '../../models';

const HomeScreen = () => {
  const {count, increamentCount, Count, decrementCount} =
    useContext(YelpStoreContext);

  return (
    <View>
      <Text
        style={{
          fontFamily: PrimaryFonts.SemiBold,
        }}>
        Home
      </Text>
      <Text style={styles.count}>{count}</Text>
      <Button title="Increase" onPress={() => increamentCount()} />
      <Button
        title="Decrease"
        disabled={Count > 0 ? false : true}
        onPress={() => decrementCount()}
      />
      <CustomIcon name={CustomIconNames.Delivery} size={100} />
      <CustomIcon name={CustomIconNames.RestaurantPlate} size={100} />
      <CustomIcon name={CustomIconNames.AmazonPay} size={100} />
      <SVGS.YelpLogo width={200} height={200} />
    </View>
  );
};

const styles = StyleSheet.create({
  count: {
    textAlign: 'center',
    fontFamily: PrimaryFonts.Bold,
    fontSize: 40,
  },
});

export default observer(HomeScreen);
