import {BusinessInterface} from '../../models';

type AllBusinesses = {
  businesses: BusinessInterface[];
  total: number;
  region: {
    center: {
      latitude: number;
      longitude: number;
    };
  };
};

enum SearchBusinessesSortBy {
  Best_Match = 'best_match',
  Rating = 'rating',
  Review_Count = 'review_count',
  distance = 'distance',
}
export {SearchBusinessesSortBy};
export type {AllBusinesses};
