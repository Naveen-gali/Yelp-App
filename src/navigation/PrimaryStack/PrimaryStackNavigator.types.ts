export enum PrimaryStackRoute {
  Home = 'Home',
  CategoryDetail = 'CategoryDetail',
}

export type PrimaryStackParams = {
  [PrimaryStackRoute.Home]: undefined;
  [PrimaryStackRoute.CategoryDetail]: {title: string; alias: string};
};
