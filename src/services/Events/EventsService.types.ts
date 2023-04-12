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

export {EventsSortBy, EventsSortOn};
export type {AllEvents};
