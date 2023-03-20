/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/navigation/RootNavigator';
import RNBootsplash from 'react-native-bootsplash';

function App(): JSX.Element {
 
 useEffect(() => {
    RNBootsplash.hide({
      fade: true,
    });
  });
  
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
