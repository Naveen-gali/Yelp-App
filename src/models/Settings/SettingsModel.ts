import {SnapshotOut, types} from 'mobx-state-tree';
import {Appearance, NativeModules} from 'react-native';
import {isIos} from '../../utils';

const SettingsModel = types
  .model({
    theme: types.optional(types.string, ''),
    language: types.optional(types.string, ''),
  })
  .views(self => ({
    setLanguage(language: string) {
      self.language = language;
    },
    setTheme(theme: string) {
      self.theme = theme;
    },
  }))
  .actions(self => ({
    DeviceTheme: () => {
      const theme = Appearance.getColorScheme();
      if (theme !== undefined && theme !== null) {
        self.theme = theme;
      } else {
        self.theme = 'light';
      }
      console.log(self.theme);
    },
    DeviceLanguage: () => {
      self.language = isIos
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier;
      console.log(self.language);
    },
  }));

export interface SettingsInterface extends SnapshotOut<typeof SettingsModel> {}

export {SettingsModel};
