import {Api, ApiConstants} from '../../api';
import {AllBusinesses, SearchBusinessesSortBy} from './BusinessService.types';

function getAllBusinesses(
  location: string,
  showError: boolean = true,
  sort_by: SearchBusinessesSortBy = SearchBusinessesSortBy.Best_Match,
  limit: number = 20,
  offset: number = 10,
) {
  return Api<AllBusinesses>(
    {
      url: ApiConstants.business.search,
      method: 'get',
      params: {
        location: location,
        sort_by: sort_by,
        limit: limit,
        offset: offset,
      },
    },
    showError,
  );
}

export {getAllBusinesses};
