import {localizedLanguagesStrings} from '../i18n';
import {CarouselDataItem} from '../screens/HomeScreen/components';
import {DeviceUtils} from './DeviceUtils';

const localizedName = (item: CarouselDataItem): string => {
  const locale = DeviceUtils.locale.substring(0, 2);
  const itemName =
    item.name[locale as keyof localizedLanguagesStrings] ?? item.name.en;
  return itemName;
};

const localizedButtonText = (item: CarouselDataItem) => {
  const locale = DeviceUtils.locale.substring(0, 2);
  const itemButtonText =
    item.buttonText[locale as keyof localizedLanguagesStrings] ??
    item.buttonText.en;
  return itemButtonText;
};

export const ItemLocaleUtils = {localizedName, localizedButtonText};
