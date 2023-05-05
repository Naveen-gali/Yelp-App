import {Api, ApiConstants} from '../../api';
import {EventInterface} from '../../models';
import {AllEvents, EventsSortBy, EventsSortOn} from './EventsService.types';

function getAllEvents(
  location: string = 'Texas',
  limit: number = 10,
  isFree: boolean = true,
  showError: boolean = true,
  offset: number = 10,
  sortOn: EventsSortOn = EventsSortOn.Populariy,
  sortBy: EventsSortBy = EventsSortBy.Ascending,
) {
  return Api<AllEvents>(
    {
      url: ApiConstants.events.search,
      method: 'get',
      params: {
        locale: 'en_US',
        location: location,
        offset: offset,
        is_free: isFree,
        sort_on: sortOn,
        sort_by: sortBy,
        limit: limit,
      },
    },
    showError,
  );
}

function getEventDetails(eventId: string, showError: boolean = true) {
  return Api<EventInterface>(
    {
      url: ApiConstants.events.search + `/${eventId}`,
      method: 'get',
    },
    showError,
  );
}

function getFeaturedEvent(
  location: string = 'Texas',
  showError: boolean = true,
) {
  return Api<EventInterface>(
    {
      url: ApiConstants.events.featured,
      params: {
        location: location,
      },
    },
    showError,
  );
}

export {getAllEvents, getEventDetails, getFeaturedEvent};
