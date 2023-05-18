import {Instance, types} from 'mobx-state-tree';
import {createContext} from 'react';
import {mstPersist} from '../utils';
import {BusinessesModel} from './BusinessesModel';
import {EventsModel} from './EventsModel';
import {CategoriesModel} from './CategoriesModel';

const store = types.model('RootStoreModel').props({
  businesses: types.optional(BusinessesModel, {}),
  events: types.optional(EventsModel, {}),
  categories: types.optional(CategoriesModel, {}),
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
});

const setupStore = () => {
  return mstPersist(
    'RootStore',
    RootStore.events,
    ['allEvents', 'eventDetail', 'featuredEvent'],
    ['getEventsTask', 'getEventDetailTask', 'getFeaturedEventTask'],
  );
};

export type StoreType = Instance<typeof store>;
export const RootStoreContext = createContext<StoreType>({} as StoreType);
export {setupStore, RootStore};
