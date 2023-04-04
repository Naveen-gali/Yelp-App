import AsyncStorage from '@react-native-async-storage/async-storage';
import {Instance, cast, toGenerator, types} from 'mobx-state-tree';
import {persist} from 'mst-persist';
import {createContext} from 'react';
import {BusinessModel, ErrorModel} from './Business';
import {BusinessService, BusinessServiceTypes} from '../services';
import {AsyncTask, runTask} from 'mst-async-task';

const store = types
  .model('RootStoreModel')
  .props({
    businesses: types.optional(types.array(BusinessModel), []),
    error: types.optional(ErrorModel, {}),
    getBusinessesTask: types.optional(AsyncTask, {}),
  })
  .views(self => ({
    get BusinessesCount() {
      return self.businesses.length;
    },
  }))
  .actions(self => {
    const getAllBusinesses = (
      location: string,
      showError?: boolean,
      sort_by?: BusinessServiceTypes.SearchBusinessesSortBy,
      limit?: number,
      offset?: number,
    ) =>
      runTask(self.getBusinessesTask, function* () {
        const response = yield* toGenerator(
          BusinessService.getAllBusinesses(
            location,
            showError,
            sort_by,
            limit,
            offset,
          ),
        );
        if (response.stat !== 'fail') {
          self.businesses = cast(response.businesses);
        } else {
          console.log('ERR SCREEN IN RS :_ ', response.show_error_screen);
          self.error.description = response.description;
          self.error.show_error_screen = response.show_error_screen;
        }
      });

    return {getAllBusinesses};
  });

const RootStore = store.create({
  businesses: [],
  error: {},
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
