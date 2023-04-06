/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Config from 'react-native-config';

let RegisteredApp = App;
RegisteredApp =
  Config.SHOW_STORYBOOK !== false && __DEV__
    ? require('./.storybook').default
    : App;

AppRegistry.registerComponent(appName, () => RegisteredApp);
