import {LocalizedLanguages} from '../i18n';
import {DeviceUtils} from './DeviceUtils';

const localizedText = (data: LocalizedLanguages) => {
  const locale = DeviceUtils.locale?.substring(0, 2);
  const itemName = data[locale as keyof LocalizedLanguages] ?? data.en;
  return itemName;
};

export const LocaleUtils = {
  localizedText,
};
