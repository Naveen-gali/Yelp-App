import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {RootStoreContext} from '../models';
import {DarkTheme, LightTheme} from '../theme';
import {AuthStackNavigator} from './AuthStack';
import {BottomTabNavigator} from './BottomTabs';

const RootNavigator = observer(() => {
  const theme = useColorScheme();
  const {auth} = useContext(RootStoreContext);

  useEffect(() => {
    auth.checkSignin();
  }, [auth]);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : LightTheme}>
      {auth.isAuthenticated ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
});

export {RootNavigator};
