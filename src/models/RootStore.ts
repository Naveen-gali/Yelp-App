import {Instance, types} from 'mobx-state-tree';
import {createContext} from 'react';
import {BusinessesModel} from './BusinessesModel';
import persist from 'mst-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EventsModel} from './EventsModel';

const store = types.model('RootStoreModel').props({
  businesses: types.optional(BusinessesModel, {}),
  events: types.optional(EventsModel, {}),
});

const RootStore = store.create({
  businesses: {
    allBusinesses: [],
  },
  events: {
    allEvents: [],
  },
});

const setupStore = () => {
  persist('RootStore', RootStore.events, {
    storage: AsyncStorage,
    jsonify: true,
    whitelist: ['allEvents', 'eventDetail', 'featuredEvent'],
    blacklist: ['getEventsTask', 'getEventDetailTask', 'getFeaturedEventTask'],
  });
};

export type StoreType = Instance<typeof store>;
export const RootStoreContext = createContext<StoreType>({} as StoreType);
export {setupStore, RootStore};
