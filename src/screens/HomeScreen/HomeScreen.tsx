import {observer} from 'mobx-react-lite';
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {HomeScreenProps} from './HomeScreen.types';
import {SearchCarousel} from './components';

const HomeScreen = observer((_props: HomeScreenProps) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <SearchCarousel />
      </ScrollView>
    </SafeAreaView>
  );
});

export {HomeScreen};
