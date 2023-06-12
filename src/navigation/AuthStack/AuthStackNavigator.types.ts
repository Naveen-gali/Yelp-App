export enum AuthStackRoute {
  Login = 'Login',
  App = 'App',
}

export type AuthStackParams = {
  [AuthStackRoute.Login]: undefined;
  [AuthStackRoute.App]: undefined;
};
