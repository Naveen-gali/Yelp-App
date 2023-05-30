const BUSINESS_URL = '/v3/businesses';
const EVENTS_URL = '/v3/events';
const CATEGORIES_URL = '/v3/categories';

const ApiConstants = {
  business: {
    search: BUSINESS_URL + '/search',
  },
  events: {
    search: EVENTS_URL,
    featured: EVENTS_URL + '/featured',
  },
  categories: {
    all: CATEGORIES_URL,
  },
};

export {ApiConstants};
