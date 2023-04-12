const BUSINESS_URL = '/v3/businesses';
const EVENTS_URL = '/v3/events';

const ApiConstants = {
  business: {
    search: BUSINESS_URL + '/search',
  },
  events: {
    search: EVENTS_URL,
    featured: EVENTS_URL + '/featured',
  },
};

export {ApiConstants};
