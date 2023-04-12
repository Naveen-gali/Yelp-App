import {EventInterface} from '../../models';

enum EventsSortBy {
  'Ascending' = 'asc',
  'Descending' = 'desc',
}
enum EventsSortOn {
  'Populariy' = 'popularity',
  'Time Start' = 'time_start',
}

type AllEvents = {
  events: EventInterface[];
  total: number;
};

// type GetEventsResponseSuccess = SuccessResponse<AllEventsResponse>;

// type GetEventDetailsResponseSuccess = SuccessResponse<EventInterface>;

// type GetFeaturedEventResponseSuccess = SuccessResponse<EventInterface>;

export {EventsSortBy, EventsSortOn};
export type {AllEvents};
