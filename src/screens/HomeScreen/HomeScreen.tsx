import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SecondaryFonts} from '../../assets';
import {RootStoreContext} from '../../models';
import {HomeScreenProps} from './HomeScreen.types';
import {BusinessServiceTypes} from '../../services';

const HomeScreen = observer((_props: HomeScreenProps) => {
  const {businesses} = useContext(RootStoreContext);

  useEffect(() => {
    businesses.getAllBusinesses(
      'Indiana 1209jaoineoiance',
      false,
      BusinessServiceTypes.SearchBusinessesSortBy.Best_Match,
      10,
    );
  }, [businesses]);

  return (
    <ScrollView>
      <Text style={styles.businessCount}>{businesses.BusinessesCount}</Text>
      <Text>{businesses.getBusinessesTask.error?.message}</Text>
      <View>
        <Button
          title="Click"
          onPress={() => {
            businesses.getAllBusinesses(
              'Indiana 1209jaoineoiance',
              false,
              BusinessServiceTypes.SearchBusinessesSortBy.Best_Match,
              20,
            );
          }}
        />
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  businessCount: {
    fontFamily: SecondaryFonts.Regular,
    fontSize: 40,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 60,
    fontFamily: SecondaryFonts.Regular,
  },
});

export {HomeScreen};
