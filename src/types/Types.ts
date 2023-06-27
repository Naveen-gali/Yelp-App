import {CustomIconNames} from '../components';
import {LocalizedLanguages} from '../i18n';

export type StatsDataItemType = {
  icon: CustomIconNames;
  count: number;
};

export type StatsDataType = StatsDataItemType[];

export type ProfileActionsDataItemType = {
  label: string;
  icon: CustomIconNames;
};

export type ProfileActionsDataType = ProfileActionsDataItemType[];

export type MoreSettingsType = MoreSettingItemType[];

export type MoreSettingItemType = {
  id: string;
  label: LocalizedLanguages;
  icon: CustomIconNames;
};

export type ExperiencesDataItemType = {
  title: LocalizedLanguages;
  logo: string;
};

export enum ScreenStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type ExperiencesDataType = ExperiencesDataItemType[];
