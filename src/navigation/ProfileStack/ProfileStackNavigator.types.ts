export enum ProfileStackRoute {
  Profile = 'Profile',
  Contact = 'Contact',
}

export type ProfileStackParams = {
  [ProfileStackRoute.Profile]: undefined;
  [ProfileStackRoute.Contact]: undefined;
};
