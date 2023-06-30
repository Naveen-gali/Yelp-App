import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {flow, types} from 'mobx-state-tree';

const AuthModel = types
  .model('AuthModel')
  .props({
    isAuthenticated: types.optional(types.boolean, false),
  })
  .actions(self => {
    const checkSignin = flow(function* () {
      const isSignedIn = yield GoogleSignin.isSignedIn();
      self.isAuthenticated = isSignedIn;
    });

    const signin = flow(function* () {
      self.isAuthenticated = true;
    });

    const signOut = flow(function* () {
      yield GoogleSignin.signOut();
      self.isAuthenticated = false;
    });

    return {checkSignin, signOut, signin};
  });

export {AuthModel};
