import {CustomIconNames} from '../../components';
import {LocalizedLanguages} from '../../i18n';

export type PopularCategoriesDataItemType = {
  title: LocalizedLanguages;
  icon: CustomIconNames;
};

export type PopularCategoriesDataType = PopularCategoriesDataItemType[];
