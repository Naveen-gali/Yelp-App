export enum PrimaryStackRoute {
  Home = 'Home',
  CategoryDetailScreen = 'CategoryDetailScreen',
}

export type PrimaryStackParams = {
  [PrimaryStackRoute.Home]: undefined;
  [PrimaryStackRoute.CategoryDetailScreen]: {alias: string; title: string};
};
