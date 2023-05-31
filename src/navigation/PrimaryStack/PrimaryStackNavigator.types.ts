import {CategoryInterface} from '../../models';

export enum PrimaryStackRoute {
  Home = 'Home',
  CategoryDetail = 'CategoryDetail',
  CategoryBusinesses = 'CategoryBusinesses',
}

export type PrimaryStackParams = {
  [PrimaryStackRoute.Home]: undefined;
  [PrimaryStackRoute.CategoryDetail]: {title: string; alias: string};
  [PrimaryStackRoute.CategoryBusinesses]: {
    category: CategoryInterface;
  };
};
