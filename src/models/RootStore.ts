import {Instance, types} from 'mobx-state-tree';
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
    set Count(val: number) {
      self.count = val;
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

export type StoreType = Instance<typeof store>;
export const YelpStoreContext = createContext<StoreType>({} as StoreType);
export {store};
