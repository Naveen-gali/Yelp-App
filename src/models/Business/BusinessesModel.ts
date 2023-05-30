import {cast, toGenerator, types} from 'mobx-state-tree';
import {BusinessModel} from './BusinessModel';
import {BusinessService, BusinessServiceTypes} from '../../services';
import {AsyncTask, runTask} from 'mst-async-task';

const BusinessesModel = types
  .model('BusinessesModel')
  .props({
    allBusinesses: types.optional(types.array(BusinessModel), []),
    getBusinessesTask: types.optional(AsyncTask, {}),
  })
  .views(self => ({
    get BusinessesCount() {
      return self.allBusinesses.length;
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
        self.allBusinesses = cast(response.data.businesses);
      });

    return {getAllBusinesses};
  });

export {BusinessesModel};
