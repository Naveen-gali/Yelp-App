import {CustomIconNames} from '../../components';

export enum BottomTabRoute {
  Search = 'Search',
  Me = 'Me',
}

export type BottomTabNavigatorIconProps = {
  focused: boolean;
  color: string;
  size: number;
  icon: CustomIconNames;
};
