import {observer} from 'mobx-react-lite';
import React, {useContext} from 'react';
import {Button, ScrollView, StyleSheet, Text} from 'react-native';
import {PrimaryFonts, SecondaryFonts} from '../../assets';
import {RootStoreContext} from '../../models';
import {HomeScreenProps} from './HomeScreen.types';
import {Strings} from '../../i18n';

const HomeScreen = observer((_props: HomeScreenProps) => {
  const {count, increamentCount, Count, decrementCount} =
    useContext(RootStoreContext);

  return (
    <ScrollView>
      <Text
        style={{
          fontFamily: PrimaryFonts.SemiBold,
        }}>
        {Strings.home.title}
      </Text>
      <Text style={styles.count}>{count}</Text>
      <Button title="Increase" onPress={() => increamentCount()} />
      <Button
        title="Decrease"
        disabled={Count > 0 ? false : true}
        onPress={() => decrementCount()}
      />
      <Text style={styles.welcomeText}>{Strings.home.welcome}</Text>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  count: {
    textAlign: 'center',
    fontFamily: PrimaryFonts.Bold,
    fontSize: 40,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 60,
    fontFamily: SecondaryFonts.Regular,
  },
});

export {HomeScreen};
