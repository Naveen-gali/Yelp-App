import {BusinessInterface} from '../../models';

type GetBusinessesResponseSuccess = {
  businesses: BusinessInterface[];
  total: number;
  region: {
    center: {
      latitude: number;
      longitude: number;
    };
  };
  stat: 'ok';
};

type GetBusinessesResponseError = {
  message: string;
  stat: 'fail';
};

enum SearchBusinessesSortBy {
  Best_Match = 'best_match',
  Rating = 'rating',
  Review_Count = 'review_count',
  distance = 'distance',
}
export {SearchBusinessesSortBy};
export type {GetBusinessesResponseSuccess, GetBusinessesResponseError};
