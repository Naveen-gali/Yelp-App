import {Api, SEARCH_BUSINESS} from '../../api';
import {
  GetBusinessesResponseError,
  GetBusinessesResponseSuccess,
  SearchBusinessesSortBy,
} from './BusinessService.types';

function getAllBusinesses(
  location: string,
  default_error: boolean = true,
  sort_by: SearchBusinessesSortBy = SearchBusinessesSortBy.Best_Match,
  limit: number = 20,
  offset: number = 10,
) {
  return Api<GetBusinessesResponseSuccess | GetBusinessesResponseError>(
    {
      url:
        SEARCH_BUSINESS +
        `?location=${location}&sort_by=${sort_by}&limit=${limit}&offset=${offset}`,
      method: 'get',
    },
    default_error,
  ).then(res => {
    return res;
  });
}

export {getAllBusinesses};
