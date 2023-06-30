import {Instance, types} from 'mobx-state-tree';
import {createContext} from 'react';
import {mstPersist} from '../utils';
import {BusinessesModel} from './Business';
import {EventsModel} from './Events';
import {CategoriesModel} from './Category';
import {AuthModel} from './Auth';
import {UserModel} from './User';

const store = types.model('RootStoreModel').props({
  businesses: types.optional(BusinessesModel, {}),
  events: types.optional(EventsModel, {}),
  categories: types.optional(CategoriesModel, {}),
  auth: types.optional(AuthModel, {}),
  user: types.optional(UserModel, {}),
});

const RootStore = store.create({
  businesses: {
    allBusinesses: [],
  },
  events: {
    allEvents: [],
  },
  categories: {
    allCategories: [],
  },
  auth: {
    isAuthenticated: false,
  },
});

const setupStore = () => {
  return mstPersist('RootStore', RootStore.auth, ['isAuthenticated'], []);
};

export type StoreType = Instance<typeof store>;
export const RootStoreContext = createContext<StoreType>({} as StoreType);
export {setupStore, RootStore};
