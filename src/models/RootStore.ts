import AsyncStorage from '@react-native-async-storage/async-storage';
import {Instance, types} from 'mobx-state-tree';
import {persist} from 'mst-persist';
import {createContext} from 'react';

const store = types
  .model('RootStoreModel')
  .props({
    count: types.number,
  })
  .views(self => ({
    get Count(): number {
      return self.count;
    },
  }))
  .actions(self => ({
    increamentCount(payload: number = 1) {
      self.count = self.count + payload;
    },
    decrementCount(payload: number = 1) {
      self.count = self.count > 0 ? self.count - payload : 0;
    },
  }));

const RootStore = store.create({
  count: 0,
});

const setupStore = () => {
  persist('RootStore', RootStore, {
    storage: AsyncStorage,
    jsonify: true,
    whitelist: ['count'],
  });
};

export type StoreType = Instance<typeof store>;
export const RootStoreContext = createContext<StoreType>({} as StoreType);
export {setupStore, RootStore};
