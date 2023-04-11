import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SecondaryFonts} from '../../assets';
import {RootStoreContext} from '../../models';
import {HomeScreenProps} from './HomeScreen.types';
import {BusinessServiceTypes} from '../../services';

const HomeScreen = observer((_props: HomeScreenProps) => {
  const {
    getAllBusinesses,
    BusinessesCount,
    error,
    businesses,
    getBusinessesTask,
  } = useContext(RootStoreContext);

  useEffect(() => {
    getAllBusinesses(
      'Indiana 1209jaoineoiance',
      false,
      BusinessServiceTypes.SearchBusinessesSortBy.Best_Match,
      10,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView>
      <Text style={styles.businessCount}>{BusinessesCount}</Text>
      <Text>{error.description}</Text>
      <Text>{businesses.length}</Text>
      {getBusinessesTask.status === 'pending' ? <ActivityIndicator /> : null}
      {error.show_error_screen || error.description.length > 0 ? (
        <Text>Error Screen</Text>
      ) : (
        <View>
          <Button
            title="Click"
            onPress={() => {
              getAllBusinesses(
                'Indiana 1209jaoineoiance',
                false,
                BusinessServiceTypes.SearchBusinessesSortBy.Best_Match,
                20,
              );
            }}
          />
        </View>
      )}
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
