import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect, useRef} from 'react';
import {useColorScheme} from 'react-native';
import {RootStoreContext} from '../models';
import {DarkTheme, LightTheme} from '../theme';
import {AuthStackNavigator} from './AuthStack';
import {BottomTabNavigator} from './BottomTabs';
import analytics from '@react-native-firebase/analytics';
import * as Sentry from '@sentry/react-native';

const RootNavigator = observer(() => {
  const theme = useColorScheme();
  const {auth} = useContext(RootStoreContext);

  const routeNameRef = useRef<string>();
  const navigationRef = useNavigationContainerRef();

  const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

  useEffect(() => {
    auth.checkSignin();
  }, [auth]);

  return (
    <NavigationContainer
      theme={theme === 'dark' ? DarkTheme : LightTheme}
      ref={navigationRef}
      onReady={() => {
        routingInstrumentation.registerNavigationContainer(navigationRef);
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      {auth.isAuthenticated ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
});

export {RootNavigator};
