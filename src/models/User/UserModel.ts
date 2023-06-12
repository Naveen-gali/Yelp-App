import {GoogleSignin, User} from '@react-native-google-signin/google-signin';
import {SnapshotOut, flow, types} from 'mobx-state-tree';

const UserModel = types
  .model('UserModel')
  .props({
    id: types.optional(types.string, ''),
    name: types.maybeNull(types.string),
    email: types.optional(types.string, ''),
    photo: types.maybeNull(types.string),
    familyName: types.maybeNull(types.string),
    givenName: types.maybeNull(types.string),
  })
  .actions(self => {
    const getCurrentUser = flow(function* () {
      const user: User = yield GoogleSignin.signInSilently();
      self.id = user.user.id;
      self.name = user.user.name;
      self.email = user.user.email;
      self.photo = user.user.photo;
      self.familyName = user.user.familyName;
      self.givenName = user.user.givenName;
      return user.user;
    });

    return {getCurrentUser};
  });

export interface UserInterface extends SnapshotOut<typeof UserModel> {}

export {UserModel};
