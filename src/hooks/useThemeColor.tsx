import {useColorScheme} from 'react-native';
import {DarkTheme, LightTheme} from '../theme';

const useThemeColor = () => {
  const theme = useColorScheme();

  if (theme === 'dark') {
    return DarkTheme;
  } else {
    return LightTheme;
  }
};

export {useThemeColor};
