import AsyncStorage from '@react-native-async-storage/async-storage';
import {Instance, types} from 'mobx-state-tree';
import {persist} from 'mst-persist';
import {createContext} from 'react';
import {BusinessesModel} from './BusinessesModel';

const store = types.model('RootStoreModel').props({
  businesses: types.optional(BusinessesModel, {}),
});

const RootStore = store.create({
  businesses: {
    allBusinesses: [],
  },
});

const setupStore = () => {
  persist('RootStore', RootStore, {
    storage: AsyncStorage,
    jsonify: true,
    whitelist: [''],
  });
};

export type StoreType = Instance<typeof store>;
export const RootStoreContext = createContext<StoreType>({} as StoreType);
export {setupStore, RootStore};
